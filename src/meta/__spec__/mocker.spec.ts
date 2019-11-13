import { Component } from '../../models';
import { MockComponent } from '../../models/__mocks__/component.class';
import { Mocker } from '../mocker';

describe('Mocker', () => {
    it('should init', () => {
        const mock = new Mocker();

        expect(mock).toBeTruthy();
    });

    describe('createMock', () => {
        let mock: Mocker;

        beforeEach(() => {
            mock = new Mocker();
        });

        it('default - should return MockComponent', () => {
            const comp = mock.createMock();

            expect(comp).toBeTruthy();
            expect(comp).toBeInstanceOf(MockComponent);
        });

        it('hasTemplate: true - should return component with default template', () => {
            const comp = mock.createMock({ hasTemplate: true });

            expect(comp).toBeTruthy();
            expect(comp.template).toEqual(mock.defaultTemplate);
        });

        it('template - should return component with provided template', () => {
            const template = '<button>Test</button>';
            const comp = mock.createMock({ template });

            expect(comp).toBeTruthy();
            expect(comp.template).toEqual(template);
        });

        it('hasStyle: true - should return component with default style', () => {
            const comp = mock.createMock({ hasStyle: true });

            expect(comp).toBeTruthy();
            expect(comp.style).toEqual(mock.defaultStyle);
        });

        it('style - should return component with provided template', () => {
            const style = '* { color: green }';
            const comp = mock.createMock({ style });

            expect(comp).toBeTruthy();
            expect(comp.style).toEqual(style);
        });

        it('hasChild: true - should return component with children', () => {
            const comp = mock.createMock({ hasChild: true });

            expect(comp).toBeTruthy();
            expect(comp.children.length).toBeGreaterThan(0);
        });

        it('children - should return component with provided chilren', () => {
            const children = [MockComponent];
            const comp = mock.createMock({ children });

            expect(comp).toBeTruthy();
            expect(comp.children.length).toEqual(1);
            expect(comp.children[0]).toBeInstanceOf(Component);
        });

        it('hasData: true - should return component with default data object', () => {
            const comp = mock.createMock({ hasData: true });

            expect(comp).toBeTruthy();
            expect(comp.data).toEqual(mock.defaultData);
        });

        it('data - should return component with provided data object', () => {
            const data = { name: 'cool test' };
            const comp = mock.createMock({ data });

            expect(comp).toBeTruthy();
            expect(comp.data).toEqual(data);
        });

        it('all - should return component with provided options', () => {
            const template = '<button>Test</button>';
            const style = '* { color: green }';
            const children = [MockComponent];
            const data = { name: 'cool test' };

            const comp = mock.createMock({ template, style, children, data });

            expect(comp).toBeTruthy();
            expect(comp.template).toEqual(template);
            expect(comp.style).toEqual(style);
            expect(comp.children.length).toEqual(1);
            expect(comp.children[0]).toBeInstanceOf(Component);
            expect(comp.data).toEqual(data);
        });
    });

    describe('clearMocks', () => {
        it('should not throw errors if there are no components', () => {
            const mock = new Mocker();
            mock.clearMocks();
        });

        it('should clear all existsing mocks', () => {
            const mock = new Mocker();
            mock.createMock();
            mock.createMock();
            mock.clearMocks();

            expect(mock.getFactory().get()).toBeFalsy();
        });
    });
});