//xterm imports
import {Terminal} from 'xterm';
import { WebLinksAddon } from 'xterm-addon-web-links';
import "xterm/css/xterm.css";
//rsocket imports
import {
    BufferEncoders,
    encodeAndAddWellKnownMetadata,
    MESSAGE_RSOCKET_COMPOSITE_METADATA,
    MESSAGE_RSOCKET_ROUTING,
    RSocketClient,
} from 'rsocket-core';
import RSocketWebSocketClient from 'rsocket-websocket-client';
import {FlowableProcessor} from "rsocket-flowable";

// current command line
let commandLine = '';
// command flux
let commandFlux = new FlowableProcessor({});

// trigger command
function triggerCommand(command) {
    if (command.trim().length > 0) {
        commandFlux.onNext({data: new Buffer(command)});
    }
}

//output remote result
function outputRemoteResult(payload) {
    if (payload.data != null && payload.data.length > 0) {
        term.write('\b \b');
        term.write(payload.data);
        term.prompt();
    }
}

//initialize xterm
let term = new Terminal();
term.loadAddon(new WebLinksAddon());
term.open(document.getElementById('terminal'));
term.prompt = () => {
    term.write('\r\n$');
};
term.writeln('Welcome xterm with RSocket.');
term.prompt();
term.focus();

//term key event for Input & Enter & Backspace
term.onKey((ev) => {
    let key = ev.key;
    let keyboardEvent = ev.domEvent;
    if (keyboardEvent.key === "Enter") {
        term.prompt();
        triggerCommand(commandLine);
        commandLine = '';
    } else if (keyboardEvent.key === "Backspace") {
        if (commandLine.length > 0) {
            term.write('\b \b');
            commandLine = commandLine.substr(0, commandLine.length - 1);
        }
    } else {
        commandLine += key;
        term.write(key);
    }
});

//initialize RSocket
const maxRSocketRequestN = 2147483647;
const keepAlive = 60000;
const lifetime = 180000;
const dataMimeType = "text/plain";
const metadataMimeType = MESSAGE_RSOCKET_COMPOSITE_METADATA.string;

const rsocketClient = new RSocketClient({
    setup: {
        keepAlive,
        lifetime,
        dataMimeType,
        metadataMimeType,
    },
    transport: new RSocketWebSocketClient(
            {wsCreator: () => new WebSocket('ws://localhost:8080/rsocket'), debug: true},
            BufferEncoders,
    ),
});

function routingKey(key) {
    let buffer = Buffer.alloc(1 + key.length);
    buffer.writeInt8(key.length, 0);
    buffer.write(key, 1);
    return buffer
}

// Open the connection
rsocketClient.connect().then(rsocket => {
    rsocket.requestChannel(commandFlux).subscribe({
        onComplete: () => console.log('Terminal completed'),
        onError: error => console.error(`Communication error:${error.message}`),
        onNext: outputRemoteResult,
        onSubscribe: sub => sub.request(maxRSocketRequestN),
    });
    //first payload with routing key
    commandFlux.onNext(
            {
                data: new Buffer(''),
                metadata: encodeAndAddWellKnownMetadata(
                        Buffer.alloc(0),
                        MESSAGE_RSOCKET_ROUTING,
                        routingKey('xterm.shell'),
                )
            });
});

