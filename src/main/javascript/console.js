//xterm imports
import {Terminal} from 'xterm';
import {WebLinksAddon} from 'xterm-addon-web-links';
import {FitAddon} from 'xterm-addon-fit';
import {RSocketAddon} from './xterm-addon-rsocket';
import "xterm/css/xterm.css";

//initialize xterm
let term = new Terminal();
//set up prompt
term.prompt = () => {
    term.write('\r\n$');
};
//load addons
term.loadAddon(new WebLinksAddon());
term.loadAddon(new FitAddon());
term.loadAddon(new RSocketAddon("ws://localhost:8080/rsocket"));
term.open(document.getElementById('terminal'));
term.writeln('Welcome xterm with RSocket.');
term.prompt();
term.focus();