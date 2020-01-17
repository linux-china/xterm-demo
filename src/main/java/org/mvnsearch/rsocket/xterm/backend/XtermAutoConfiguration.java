package org.mvnsearch.rsocket.xterm.backend;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.shell.ParameterResolver;
import org.springframework.shell.jline.JLineShellAutoConfiguration;
import org.springframework.shell.standard.commands.Help;
import org.springframework.shell.standard.commands.StandardCommandsAutoConfiguration;
import org.springframework.web.reactive.HandlerMapping;
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @Bean
    public XtermWSHandler xtermWSHandler() {
        return new XtermWSHandler();
    }

    @Bean
    public HandlerMapping xtermHandlerMapping(XtermWSHandler xtermWSHandler) {
        Map<String, WebSocketHandler> map = new HashMap<>();
        map.put("/ws/xterm", xtermWSHandler);
        return new SimpleUrlHandlerMapping(map, -1);
    }

    @Bean
    @ConditionalOnMissingBean
    public WebSocketHandlerAdapter handlerAdapter() {
        return new WebSocketHandlerAdapter();
    }
}
