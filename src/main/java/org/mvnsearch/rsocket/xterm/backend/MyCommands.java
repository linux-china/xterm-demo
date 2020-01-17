package org.mvnsearch.rsocket.xterm.backend;

import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;

/**
 * my commands
 *
 * @author linux_china
 */
@ShellComponent
public class MyCommands {

    @ShellMethod("Add two integers together.")
    public int add(int a, int b) {
        return a + b;
    }

    @ShellMethod("Minus two integers together.")
    public int minus(int a, int b) {
        return a - b;
    }
}