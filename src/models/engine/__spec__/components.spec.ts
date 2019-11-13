import { ParseComponents } from '../components';
import { Mocker } from '../../../meta/mocker';

describe('Component Parse Engine', () => {
    const mock = new Mocker();

    it('should init', () => {
        const parse = new ParseComponents(null);
        
        expect(parse).toBeTruthy();
    });

    it('should init with module', () => {
        const parse = new ParseComponents(mock.module);

        expect(parse).toBeTruthy();
    });

    describe('Parse Components', () => {
        const parse = new ParseComponents(mock.module);

        it('should return empty list if there are no components', () => {
            const comp = mock.createMock({ hasChild: false });

            const actual = parse.parseComponents(comp.parsedNode);

            expect(actual.length).toEqual(0);
        });

        it('should return components of chilren', () => {
            const comp = mock.createMock({ hasChild: true });

            const actual = parse.parseComponents(comp.parsedNode);

            expect(actual.length).toBeTruthy();
        });
    });
});