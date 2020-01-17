package org.mvnsearch.rsocket.xterm.backend;

import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;

/**
 * Xterm WebSocket Handler
 *
 * @author linux_china
 */
public class XtermWSHandler extends XtermHandler implements WebSocketHandler {
    @Override
    public Mono<Void> handle(WebSocketSession session) {
        Flux<WebSocketMessage> output = session.receive()
                .map(wsMessage -> wsMessage.getPayloadAsText(StandardCharsets.UTF_8))
                .filter(payloadText -> !payloadText.trim().isEmpty())
                .map(this::executeCommand)
                .map(session::textMessage);

        return session.send(output);
    }
}
