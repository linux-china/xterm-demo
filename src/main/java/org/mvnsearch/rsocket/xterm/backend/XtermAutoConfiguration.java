package org.mvnsearch.rsocket.xterm.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.shell.ParameterResolver;
import org.springframework.shell.standard.commands.Help;

import java.util.List;

/**
 * Xterm auto configuration
 *
 * @author linux_china
 */
@Configuration
public class XtermAutoConfiguration {
    @Bean
    public Help help(List<ParameterResolver> parameterResolvers) {
        return new Help(parameterResolvers);
    }
}
