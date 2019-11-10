import { MockComponentParams } from '../__mocks__/component-params.class';
import { ComponentCreator } from '../__mocks__/component-creator.class';

describe('Class: Component Params', () => {
    const creator = new ComponentCreator();
    afterEach(() => {
        creator.clearMocks();
    });
    it('should init', () => {
        const params = new MockComponentParams(<MockComponentParams>{ name: 'test' });
        const component = creator.createMock({ data: params });

        expect(component).toBeTruthy();
        expect(component.data).toBeTruthy();
        expect(component.data['name']).toEqual(params.name);
    });

    it('component should still init without params', () => {
        const component = creator.createMock();

        expect(component).toBeTruthy();
        expect(component.data).toEqual({});
    });

    it('params should still init without params', () => {
        const params = new MockComponentParams(null);
        const component = creator.createMock({ data: null });

        expect(component).toBeTruthy();
        expect(component.data).toBeTruthy();
        expect(component.data).toEqual({});
    });
});
