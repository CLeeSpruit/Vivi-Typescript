import { ComponentCreator } from './component-creator.class';
import { MockComponent } from '../../models/__mocks__/component.class';
import { ComponentParams } from '../../models/component-params.class';
import { ComponentIngredient } from '../component-ingredient.class';

describe('Component Creator', () => {
    it('should init', () => {
        const creator = new ComponentCreator();

        expect(creator).toBeTruthy();
    });

    describe('createMock', () => {
        let creator: ComponentCreator;

        beforeEach(() => {
            creator = new ComponentCreator();
        });

        it('default - should return MockComponent', () => {
            const mock = creator.createMock();

            expect(mock).toBeTruthy();
            expect(mock).toBeInstanceOf(MockComponent);
        });

        it('hasTemplate: true - should return component with default template', () => {
            const mock = creator.createMock({ hasTemplate: true });

            expect(mock).toBeTruthy();
            expect(mock.template).toEqual(creator.defaultTemplate);
        });

        it('template - should return component with provided template', () => {
            const template = '<button>Test</button>';
            const mock = creator.createMock({ template });

            expect(mock).toBeTruthy();
            expect(mock.template).toEqual(template);
        });

        it('hasStyle: true - should return component with default style', () => {
            const mock = creator.createMock({ hasStyle: true });

            expect(mock).toBeTruthy();
            expect(mock.style).toEqual(creator.defaultStyle);
        });

        it('style - should return component with provided template', () => {
            const style = '* { color: green }';
            const mock = creator.createMock({ style });

            expect(mock).toBeTruthy();
            expect(mock.style).toEqual(style);
        });

        it('hasChild: true - should return component with children', () => {
            const mock = creator.createMock({ hasChild: true });

            expect(mock).toBeTruthy();
            expect(mock.children.length).toBeGreaterThan(0);
        });

        it('children - should return component with provided chilren', () => {
            const children = [ MockComponent ];
            const mock = creator.createMock({ children });

            expect(mock).toBeTruthy();
            expect(mock.children.length).toEqual(1);
            expect(mock.children[0]).toBeInstanceOf(ComponentIngredient);
            expect(mock.children[0].component).toBeInstanceOf(MockComponent);
        });

        it('hasData: true - should return component with default data object', () => {
            const mock = creator.createMock({ hasData: true });

            expect(mock).toBeTruthy();
            expect(mock.data).toEqual(creator.defaultData);
        });

        it('data - should return component with provided data object', () => {
            const data = <ComponentParams>{ name: 'cool test'};
            const mock = creator.createMock({ data });

            expect(mock).toBeTruthy();
            expect(mock.data).toEqual(data);
        });

        it('all - should return component with provided options', () => {
            const template = '<button>Test</button>';
            const style = '* { color: green }';
            const children = [ MockComponent ];
            const data = <ComponentParams>{ name: 'cool test'};

            const mock = creator.createMock({ template, style, children, data });

            expect(mock).toBeTruthy();
            expect(mock.template).toEqual(template);
            expect(mock.style).toEqual(style);
            expect(mock.children.length).toEqual(1);
            expect(mock.children[0]).toBeInstanceOf(ComponentIngredient);
            expect(mock.children[0].component).toBeInstanceOf(MockComponent);
            expect(mock.data).toEqual(data);
        });
    });
});