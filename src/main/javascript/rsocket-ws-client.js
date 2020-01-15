import {
    BufferEncoders,
    encodeAndAddWellKnownMetadata,
    MESSAGE_RSOCKET_COMPOSITE_METADATA,
    MESSAGE_RSOCKET_ROUTING,
    RSocketClient,
} from 'rsocket-core';
import RSocketWebSocketClient from 'rsocket-websocket-client';

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

// Open the connection
client.connect().then(socket => {
    // noinspection JSValidateTypes
    socket.requestResponse({
        data: new Buffer('ls -al'),
        metadata: encodeAndAddWellKnownMetadata(
                Buffer.alloc(0),
                MESSAGE_RSOCKET_ROUTING,
                routingKey('xterm.command'),
        )
    }).subscribe({
        onComplete: (payload) => console.log('Request-response completed %s', new TextDecoder("utf-8").decode(payload.data))
    });
});

