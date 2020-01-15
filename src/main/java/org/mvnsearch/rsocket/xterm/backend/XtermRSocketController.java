package org.mvnsearch.rsocket.xterm.backend;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * xterm rsocket controller
 *
 * @author linux_china
 */
@Controller
public class XtermRSocketController {

    @MessageMapping("xterm.shell")
    public Flux<String> shell(Flux<String> commands) {
        return commands.map(command -> {
            if (command.isEmpty()) {
                return "";
            } else {
                return ">>> " + command;
            }
        });
    }

    @MessageMapping("xterm.command")
    public Mono<String> command(String command) {
        return Mono.just("command:" + command);
    }
}
