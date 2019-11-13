import { Service } from '../service.class';
import { ModuleFactory } from '../../factory';
import { ParseElements } from './elements';
import { ParseComponents } from './components';

export class ParseEngine extends Service {
    private elements: ParseElements;
    private component: ParseComponents;

    constructor(
        private module: ModuleFactory
    ) {
        super();
        this.elements = new ParseElements();
        this.component = new ParseComponents(module);
    }

    parse(el: HTMLElement, data: Object) {
        this.elements.parseNode(el, data);
    }
}