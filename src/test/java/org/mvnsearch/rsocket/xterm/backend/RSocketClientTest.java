package org.mvnsearch.rsocket.xterm.backend;

import io.rsocket.metadata.WellKnownMimeType;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.messaging.rsocket.RSocketRequester;
import org.springframework.util.MimeType;
import reactor.core.publisher.Mono;

import java.net.URI;

/**
 * RSocket Client test
 *
 * @author linux_china
 */
public class RSocketClientTest {
    private static RSocketRequester requester;

    @BeforeAll
    public static void setUp() {
        requester = RSocketRequester.builder()
                .dataMimeType(MediaType.TEXT_PLAIN)
                .metadataMimeType(MimeType.valueOf(WellKnownMimeType.MESSAGE_RSOCKET_COMPOSITE_METADATA.getString()))
                .connectWebSocket(URI.create("ws://localhost:8080/rsocket"))
                .block();
    }

    @AfterAll
    public static void tearDown() {
        requester.rsocket().dispose();
    }


    @Test
    public void testOperation() throws Exception {
        Mono<String> user = requester.route("xterm.command").data("ls -al").retrieveMono(String.class);
        System.out.println(user.block());
    }

}
