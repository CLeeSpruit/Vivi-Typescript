import { ApplicationEvent } from './';

export class ApplicationListener {
    private stream: flyd.Stream<any>;

    constructor(
        private eventName: string,
        callback: (event: ApplicationEvent) => any,
        str: flyd.Stream<ApplicationEvent>,
        options?: { emitEvent: boolean }
    ) {
        const cb = (event: ApplicationEvent) => {
            if (event.closeOnComplete) {
                this.close();
            }

            if (options && options.emitEvent) {
                callback(event);
            } else {
                callback(event.data);
            }
        };

        this.stream = str.map(cb);
    }

    // Alias for close to make it work better with the Listener class
    remove() {
        this.close();
    }

    close() {
        this.stream.end(true);
    }
}