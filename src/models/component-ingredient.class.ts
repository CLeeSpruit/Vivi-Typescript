import { ComponentParams } from './component-params.class';
import { ViviComponentFactory } from 'factory';
import { Component } from './component.class';

export class ComponentIngredient {
    component: Component;

    constructor(
        private parentEl: HTMLElement,
        private factory: ViviComponentFactory<Component>,
        private data: ComponentParams
    ) {
        //
    }

    create() {
        this.component = this.factory.create(this.data);
        this.component.append(this.parentEl, true);
    }

    load() {
        this.component.loadAll();
    }
}