package org.mvnsearch.rsocket.xterm.backend;

import org.jline.utils.AttributedString;
import org.jline.utils.AttributedStyle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.shell.Shell;
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
    @Autowired
    private Shell shell;

    @MessageMapping("xterm.shell")
    public Flux<String> shell(Flux<String> commands) {
        return commands
                .filter(data -> !data.trim().isEmpty())
                .flatMap(commandLine -> Mono.fromCallable(() -> {
                    Object result = this.shell.evaluate(() -> commandLine);
                    String textOutput;
                    if (result instanceof Exception) {
                        textOutput = new AttributedString(result.toString(), AttributedStyle.DEFAULT.foreground(AttributedStyle.RED)).toAnsi();
                    } else if (result instanceof AttributedString) {
                        textOutput = ((AttributedString) result).toAnsi();
                    } else {
                        textOutput = result.toString();
                    }
                    return textOutput;
                }));
    }

    @MessageMapping("xterm.command")
    public Mono<String> command(String command) {
        return Mono.just("command:" + command);
    }
}
