const Terminal = require("xterm").Terminal;
require("xterm/css/xterm.css");
let term = new Terminal();
term.open(document.getElementById('terminal'));
term.prompt = () => {
    term.write('\r\n$');
};
term.writeln('Welcome to xterm.');
term.prompt();
term.focus();
// Move curr_line outside of async scope.
let currLine = '';

function triggerCommand(line) {
    console.log("command line: " + line)
}

term.onKey((ev) => {
    let key = ev.key;
    let keyboardEvent = ev.domEvent;
    if (keyboardEvent.key === "Enter") {
        term.prompt();
        triggerCommand(currLine);
        currLine = '';
    } else {
        currLine += key;
        term.write(key);
    }
});
