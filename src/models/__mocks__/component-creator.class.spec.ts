import { ComponentCreator } from './component-creator.class';
import { MockComponent } from '../../models/__mocks__/component.class';
import { Component } from '../component.class';

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
            expect(mock.children[0]).toBeInstanceOf(Component);
        });

        it('hasData: true - should return component with default data object', () => {
            const mock = creator.createMock({ hasData: true });

            expect(mock).toBeTruthy();
            expect(mock.data).toEqual(creator.defaultData);
        });

        it('data - should return component with provided data object', () => {
            const data = { name: 'cool test'};
            const mock = creator.createMock({ data });

            expect(mock).toBeTruthy();
            expect(mock.data).toEqual(data);
        });

        it('all - should return component with provided options', () => {
            const template = '<button>Test</button>';
            const style = '* { color: green }';
            const children = [ MockComponent ];
            const data = { name: 'cool test'};

            const mock = creator.createMock({ template, style, children, data });

            expect(mock).toBeTruthy();
            expect(mock.template).toEqual(template);
            expect(mock.style).toEqual(style);
            expect(mock.children.length).toEqual(1);
            expect(mock.children[0]).toBeInstanceOf(Component);
            expect(mock.data).toEqual(data);
        });
    });

    describe('clearMocks', () => {
        it('should not throw errors if there are no components', () => {
            const creator = new ComponentCreator();
            creator.clearMocks();
        });

        it('should clear all existsing mocks', () => {
            const creator = new ComponentCreator();
            creator.createMock();
            creator.createMock();
            creator.clearMocks();

            expect(creator.getFactory().get()).toBeFalsy();
        });
    });
});