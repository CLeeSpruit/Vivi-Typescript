import { ApplicationListener } from '../application-listener.class';
import { ApplicationEvent } from 'events/application-event.class';
import { stream } from 'flyd';
describe('Application Listener', () => {
    let appListener: ApplicationListener;

    afterEach(() => {
        if (appListener) {
            appListener.close();
        }
    });

    it('should init', () => {
        appListener = new ApplicationListener('', null, stream());
    });

    it('should emit callback when subscription is updated', (done) => {
        const str = stream<ApplicationEvent>();
        appListener = new ApplicationListener('', () => {
            expect(true).toBeTruthy();
            done();
        }, str);
        str(<ApplicationEvent>{ data: {} });
    });

    it('should close if the event has close on complete', () => {
        const str = stream<ApplicationEvent>();
        appListener = new ApplicationListener('', () => { }, str);
        const closeWatch = jest.spyOn(appListener, 'close');

        str(<ApplicationEvent>{ data: {}, closeOnComplete: true });

        expect(closeWatch).toHaveBeenCalledTimes(1);
    });

    it('should emit whole event object if options -> emitEvent flag is on', (done) => {
        const str = stream<ApplicationEvent>();
        const expected = <ApplicationEvent>{ data: {} };
        appListener = new ApplicationListener('', (event: ApplicationEvent) => {
            expect(event).toEqual(expected);
            done();
        }, str, { emitEvent: true });

        str(expected);
    });

    it('should emit only data if options -> emitEvent flag is off', (done) => {
        const str = stream<ApplicationEvent>();
        const expected = <ApplicationEvent>{ data: 'test' };
        appListener = new ApplicationListener('', (data: any) => {
            expect(data).toEqual(expected.data);
            done();
        }, str, { emitEvent: false });

        str(expected);
    });

    it('remove should be an alias for close', () => {
        const str = stream<ApplicationEvent>();
        appListener = new ApplicationListener('', () => { }, str);
        const closeWatch = jest.spyOn(appListener, 'close');

        appListener.remove();

        expect(closeWatch).toHaveBeenCalledTimes(1);
    });
});