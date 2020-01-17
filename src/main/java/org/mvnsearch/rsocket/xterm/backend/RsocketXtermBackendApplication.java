package org.mvnsearch.rsocket.xterm.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.shell.jline.JLineShellAutoConfiguration;
import org.springframework.shell.standard.commands.StandardCommandsAutoConfiguration;

@SpringBootApplication(exclude = {JLineShellAutoConfiguration.class, StandardCommandsAutoConfiguration.class})
public class RsocketXtermBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(RsocketXtermBackendApplication.class, args);
    }

}
