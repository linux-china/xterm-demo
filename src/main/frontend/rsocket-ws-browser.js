import {
    BufferEncoders,
    encodeAndAddWellKnownMetadata,
    MESSAGE_RSOCKET_COMPOSITE_METADATA,
    MESSAGE_RSOCKET_ROUTING,
    RSocketClient,
} from 'rsocket-core';
import RSocketWebSocketClient from 'rsocket-websocket-client';
import {FlowableProcessor} from "rsocket-flowable";

const maxRSocketRequestN = 2147483647;
const keepAlive = 60000;
const lifetime = 180000;
const dataMimeType = "text/plain";
const metadataMimeType = MESSAGE_RSOCKET_COMPOSITE_METADATA.string;

const client = new RSocketClient({
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


function rpc(rsocket) {
    rsocket.requestResponse({
        data: new Buffer('ls -al'),
        metadata: encodeAndAddWellKnownMetadata(
                Buffer.alloc(0),
                MESSAGE_RSOCKET_ROUTING,
                routingKey('xterm.command'),
        )
    }).subscribe({
        onComplete: (payload) => console.log('Request-response completed %s', payload.data)
    });
}

function channel(rsocket) {
    let flux = new FlowableProcessor({});
    rsocket.requestChannel(flux).subscribe({
        onComplete: () => console.log('Request-channel completed'),
        onError: error => console.error(`Request-stream error:${error.message}`),
        onNext: value => console.log('%s', value.data),
        onSubscribe: sub => sub.request(maxRSocketRequestN),
    });

    flux.onNext(
            {
                data: new Buffer(''),
                metadata: encodeAndAddWellKnownMetadata(
                        Buffer.alloc(0),
                        MESSAGE_RSOCKET_ROUTING,
                        routingKey('xterm.shell'),
                )
            });
    flux.onNext({data: new Buffer("ls -al")});
    flux.onComplete();
}

// Open the connection
client.connect().then(rsocket => {
    rpc(rsocket)
});
