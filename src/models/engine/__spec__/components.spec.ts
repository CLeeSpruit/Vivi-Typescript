import { ParseComponents } from '../components';
import { Mocker } from '../../../meta/mocker';

describe('Component Parse Engine', () => {
    const mock = new Mocker();

    afterEach(() => {
        mock.clearMocks();
    });

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
            const comp = mock.createMock({ template: '<mock></mock>' });

            const actual = parse.parseComponents(comp.parsedNode);

            expect(actual.length).toBeTruthy();
        });

        it('should return multiple components of children', () => {
            const comp = mock.createMock({ template: '<mock></mock><mock></mock>' });

            const actual = parse.parseComponents(comp.parsedNode);

            expect(actual.length).toEqual(2);
        });
    });
});