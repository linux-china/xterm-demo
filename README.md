Xterm.js demo with Spring Boot RSocket
======================================
[![Build Status](https://api.travis-ci.com/linux-china/xterm-demo.svg?branch=master)](https://travis-ci.com/linux-china/xterm-demo)

A web terminal with following tech stack:

* Xterm.js to render terminal in browser
* Input commands to be executed on the backend(Spring Boot + RSocket)
* Spring Shell command model to write your commands
* RSocket protocol: communication between browser and backend
* xterm-addon-rsocket
* Web Components for Xterm

If you want to use Xterm.js in your Spring Boot app, please use https://github.com/linux-china/xtermjs-spring-boot-starter

# How to run?

```
$ mvn compile spring-boot:run
```

Then visit [http://localhost:8080/index.html](http://localhost:8080/index.html) and screenshot alike following:

![Xterm Screenshot](.README_images/xterm_screenshot.png)

# How to write my command?

You just need to write standard ShellComponent of Spring Shell, and example as following:

```java
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
```

**Attention:** You can choose Picocli to build commands also https://github.com/remkop/picocli/tree/master/picocli-spring-boot-starter

# Use Cases

* mysql/redis-cli CLI in browser
* App Info Viewer: configuration, refresh etc
* Metrics Query
* JVM info: thread, heap etc
* Call functions on FaaS platform`

# References

* Xterm.js: https://xtermjs.org/
* Xterm.js addons: https://www.npmjs.com/search?q=xterm%20addon
* Spring Boot RSocket: https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-rsocket
* Spring Shell docs: https://docs.spring.io/spring-shell/docs/2.0.0.RELEASE/reference/htmlsingle/
