import {
    BufferEncoders,
    encodeAndAddWellKnownMetadata,
    MESSAGE_RSOCKET_COMPOSITE_METADATA,
    MESSAGE_RSOCKET_ROUTING,
    RSocketClient,
} from 'rsocket-core';
import RSocketTcpClient from 'rsocket-tcp-client';

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
    transport: new RSocketTcpClient(
            {host: "127.0.0.1", port: 42252},
            BufferEncoders,
    ),
});

function routingKey(key) {
    let buffer = Buffer.alloc(3 + key.length);
    buffer.writeInt8(0, key.length);
    buffer.write(key, 3);
    return buffer
}

// Open the connection
client.connect().then(rsocket => {
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
});

setTimeout(() => {
}, 30000000);

