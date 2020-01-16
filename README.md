Xterm.js demo with Spring Boot RSocket
======================================

A web terminal with following tech stack:

* Xterm.js to render terminal
* Input commands to be executed on the backend(Spring Boot + RSocket)
* RSocket protocol: communication between browser and backend
* Extension: Please click [XtermRSocketController.java](https://github.com/linux-china/xterm-demo/blob/master/src/main/java/org/mvnsearch/rsocket/xterm/backend/PortalController.java)

# How to run?

```
$ mvn compile spring-boot:run
```

Then visit [http://localhost:8080/index.html](http://localhost:8080/index.html) and screenshot alike following:

![Xterm Screenshot](.README_images/xterm_screenshot.png)

# Use Cases

* mysql/redis-cli CLI in browser
* App Info Viewer: configuration, refresh
* Metrics Query
* JVM info: thread, heap etc
* Call functions on FaaS platform

# References

* Xterm.js: https://xtermjs.org/
* Xterm.js addons: https://www.npmjs.com/search?q=xterm%20addon
* Spring Boot RSocket: https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-rsocket
