package org.mvnsearch.rsocket.xterm.backend;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.shell.ParameterResolver;
import org.springframework.shell.jline.JLineShellAutoConfiguration;
import org.springframework.shell.standard.commands.Help;
import org.springframework.shell.standard.commands.StandardCommandsAutoConfiguration;

import java.util.List;

/**
 * Xterm auto configuration
 *
 * @author linux_china
 */
@Configuration
@EnableAutoConfiguration(exclude = {JLineShellAutoConfiguration.class, StandardCommandsAutoConfiguration.class})
public class XtermAutoConfiguration {
    @Bean
    public Help help(List<ParameterResolver> parameterResolvers) {
        return new Help(parameterResolvers);
    }
}
