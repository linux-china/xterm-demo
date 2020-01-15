package org.mvnsearch.rsocket.xterm.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

/**
 * Portal Controller
 *
 * @author linux_china
 */
@RestController
public class PortalController {
    @GetMapping("/")
    public Mono<String> index() {
        return Mono.just("Welcome");
    }
}
