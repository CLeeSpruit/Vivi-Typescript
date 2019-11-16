import * as shortId from 'shortid';
import { ApplicationListener, Listener } from '../events';

export abstract class Service {
    id: string;
    listeners: Array<Listener | ApplicationListener> = new Array<Listener | ApplicationListener>();

    constructor() {
        this.id = shortId.generate();
    }

    destroy() {
        this.listeners.forEach(listener => {
            listener.remove();
        });
    }
}