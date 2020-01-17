//xterm imports
import {Terminal} from 'xterm';
import {WebLinksAddon} from 'xterm-addon-web-links';
import {FitAddon} from 'xterm-addon-fit';
import {RSocketAddon} from './xterm-addon-rsocket';
import "xterm/css/xterm.css";

class XtermConsole extends HTMLElement {
    constructor() {
        super();
        let rsocketUrl = this.getAttribute('rsocket');
        let container = document.createElement('div');
        this.append(container);
        //initialize xterm
        let term = new Terminal();
        term.prompt = () => {
            term.write('\r\n$');
        };
        //load addons
        term.loadAddon(new WebLinksAddon());
        term.loadAddon(new FitAddon());
        term.loadAddon(new RSocketAddon(rsocketUrl));
        term.open(container);
        term.writeln('Welcome xterm with RSocket.');
        term.prompt();
        term.focus();
        this.terminal = term;
    }
}

window.customElements.define('xterm-console', XtermConsole);
