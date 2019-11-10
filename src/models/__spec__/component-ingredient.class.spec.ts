import { ComponentIngredient } from '../component-ingredient.class';
import { ComponentCreator } from '../__mocks__/component-creator.class';

describe('Class: Component Ingredient', () => {
    const mockCreator = new ComponentCreator();

    const mockIngredient = () => {
        return new ComponentIngredient(null, mockCreator.getFactory());
    };

    beforeEach(() => {
        //
    });

    afterEach(() => {
        mockCreator.clearMocks();
    });

    it('should init', () => {
        const actual = mockIngredient();

        expect(actual).toBeTruthy();
    });

    it('should init in a component', () => {
        const component = mockCreator.createMock({ hasChild: true });

        expect(component.children).toBeTruthy();
        expect(component.children.length).toEqual(1);
        expect(component.children[0]).toBeInstanceOf(ComponentIngredient);
    });
    
    describe('load', () => {
        it('load should append element', () => {
            const actual = mockIngredient();
    
            actual.load();
    
            expect(actual.component.element).toBeTruthy();
        });
    });
});