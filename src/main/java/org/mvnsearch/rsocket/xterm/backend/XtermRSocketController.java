package org.mvnsearch.rsocket.xterm.backend;

import org.springframework.lang.Nullable;
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
        return commands
                .filter(data -> !data.trim().isEmpty())
                .flatMap(data -> {
                    String commandLine = data.trim();
                    String command = commandLine;
                    String params = null;
                    if (commandLine.contains(" ")) {
                        command = commandLine.substring(0, commandLine.indexOf(" "));
                        params = commandLine.substring(commandLine.indexOf(" ") + 1).trim();
                    }
                    return executeCommand(command, params);
                });
    }

    public Mono<String> executeCommand(String command, @Nullable String params) {
        if (command.equalsIgnoreCase("info")) {
            return Mono.just("xterm with RSocket: http://rsocket.io");
        } else if (command.equalsIgnoreCase("help")) {
            return help();
        }
        return Mono.just(">>> " + command);
    }

    public Mono<String> help() {
        return Mono.just("This is help");
    }

    @MessageMapping("xterm.command")
    public Mono<String> command(String command) {
        return Mono.just("command:" + command);
    }
}
