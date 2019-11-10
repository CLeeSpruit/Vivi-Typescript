import { ModuleFactory, ViviComponentFactory } from '../../factory';
import { Component } from '../../models';
import { MockComponent } from '../../models/__mocks__/component.class';
import { ViviElementParams } from '../../decorators';
import { EventTypes } from '../../events';

export interface ComponentMockOptions {
    hasTemplate?: boolean;
    template?: string;
    hasStyle?: boolean;
    style?: string;
    hasChild?: boolean;
    children?: Array<new (...args) => Component>;
    hasData?: boolean;
    data?: Object;
    hasElements?: boolean;
    elements?: Array<ViviElementParams>;
}

export class ComponentCreator {
    module: ModuleFactory;
    readonly defaultComponents = [
        { constructor: MockComponent }
    ];
    readonly defaultTemplate = '<span>Test</span>';
    readonly defaultStyle = '* { color: red }';
    readonly defaultData = { name: 'test' };
    readonly defaultElement = <ViviElementParams>{
        selector: 'input.test',
        eventType: EventTypes.click,
        handlerFnName: 'handleClick',
        propertyKey: 'button'
    };

    constructor() {
        this.module = new ModuleFactory({
            componentConstructors: this.defaultComponents
        });
    }

    getFactory(): ViviComponentFactory<MockComponent> {
        return <ViviComponentFactory<MockComponent>>this.module.getFactory(MockComponent);
    }

    createMock(options?: ComponentMockOptions): Component {
        const comp = this.getFactory().create();
        if (!options) {
            return comp;
        }

        if (options.template || options.hasTemplate) {
            comp.template = options.template ? options.template : this.defaultTemplate;
        }

        if (options.style || options.hasStyle) {
            comp.style = options.style ? options.style : this.defaultStyle;

            // Since this is set via the factory and is already in place,
            //     we're going to have to replace the existing version to "fake" the original
            const styleEl = document.createElement('style');
            styleEl.innerHTML = comp.style;
            document.head.appendChild(styleEl);
        }

        if (options.children || options.hasChild) {
            if (options.children) {
                options.children.forEach(child => {
                    comp.createChild(comp.element, child);
                });
            } else {
                comp.createChild(comp.element, MockComponent);
            }
        }

        if (options.data || options.hasData) {
            comp.data = options.data ? options.data : this.defaultData;
        }

        if (options.hasElements || options.elements) {
            if (options.elements) {
                Reflect.defineMetadata('ViviElement', options.elements, comp);
                options.elements.forEach(element => comp[element.handlerFnName] = () => {});
            } else {
                Reflect.defineMetadata('ViviElement', [this.defaultElement], comp);
                comp[this.defaultElement.handlerFnName] = () => {};
            }
        }
        comp.append();
        comp.redraw();

        return comp;
    }

    clearMocks() {
        const factory = this.getFactory();
        factory.destroyAll();
    }
}