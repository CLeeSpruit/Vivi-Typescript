import { ViviComponentFactory } from '../';
import { MockComponent } from '../../models/__mocks__/component.class';
import { ComponentCreator } from '../../models/__mocks__/component-creator.class';

describe('Component Factory', () => {
    const creator = new ComponentCreator();

    afterEach(() => {
        creator.clearMocks();
    });

    it('should init', () => {
        const mock = new ViviComponentFactory<MockComponent>(MockComponent);

        expect(mock).toBeTruthy();
    });

    it('should append style to head if style is provided', () => {
        const style = 'a { color: blue }'
        const stylishMock = creator.createMock({ style });
        const actual = document.getElementsByTagName('style');
        expect(actual.length).toEqual(1);
        expect(actual.item(0).innerHTML).toEqual(style);
    });

    describe('create', () => {

        it('should create a new component and return that component', () => {
            const mock = new ViviComponentFactory<MockComponent>(MockComponent);

            const component = <MockComponent>mock.create();

            expect(component).toBeTruthy();
            expect(component instanceof MockComponent).toBeTruthy();
        });
    });

    describe('get', () => {
        it('get should return specific component', () => {
            const componentA = creator.createMock();
            const componentB = creator.createMock();

            expect(creator.getFactory().get(componentA.id)).toEqual(componentA);
            expect(creator.getFactory().get(componentB.id)).toEqual(componentB);
        });

        it('get should return first component created if no id is provided', () => {
            const componentA = creator.createMock();
            const componentB = creator.createMock();

            expect(creator.getFactory().get()).toEqual(componentA);
        });

        it('get should return null if no id is provided and no components have been created', () => {
            expect(creator.getFactory().get()).toEqual(null);
        });
    });

    describe('destroy', () => {
        it('should trigger component.destroy', () => {
            const comp = creator.createMock();
            const destroySpy = spyOn(comp, 'destroy');
            comp.append();

            creator.getFactory().destroy(comp.id);

            expect(destroySpy).toHaveBeenCalledTimes(1);
        });

        it('should remove from the DOM', () => {
            const comp = creator.createMock();
            comp.append();

            creator.getFactory().destroy(comp.id);

            const actual = document.getElementById(comp.id);
            expect(actual).toBeFalsy();
        });

        it('should remove from the factory map', () => {
            const comp = creator.createMock();
            comp.append();

            creator.getFactory().destroy(comp.id);

            const actual = creator.getFactory().get(comp.id);
            expect(actual).toBeFalsy();
        });
    });
});
