import { ViviServiceFactory } from './';
import { Component, Service } from '../models';
import { ComponentParams } from '../models/component-params.class';

export class ViviComponentFactory<T> {
    private components: Map<string, Component> = new Map<string, Component>();

    constructor(
        private constructor: new (...args) => Component,
        private services: Array<ViviServiceFactory<Service>> = new Array<ViviServiceFactory<Service>>()
    ) {
        // Create an initial component to generate information from
        const component = new this.constructor(...this.services.map(service => service.get()));

        /*
            @todo: Add dynamic styling
            @body: Move this into the parse engine
        */

        // Create Style
        if (component.style) {
            const styleEl = document.createElement('style');
            styleEl.id = `style-${this.constructor.name}`;
            styleEl.innerHTML = component.style;
            document.head.appendChild(styleEl);
        }

        // Cleanup fake data
        component.destroy();
    }

    create(data?: ComponentParams): Component {
        const component = new this.constructor(data, ...this.services.map(service => service.get()));

        this.components.set(component.id, component);
        return component;
    }

    destroy(id: string) {
        const component = this.get(id);

        if (!component) {
            console.error(`${this.constructor.name}: No component found with id: ${id}`);
            return;
        }

        // Run cleanup
        component.destroy();

        // Remove from the DOM
        const node = document.getElementById(id);
        node.remove();

        // Remove from the map
        this.components.delete(id);
    }

    get(id?: string): Component {
        if (id) {
            // TODO: Throw error if id doesn't exist
            return this.components.get(id);
        } else {
            // TODO: throw error (or warning) if this.components.length is 0
            // TODO: Should this grab the last component instead?
            return Array.from(this.components.values())[0] || null;
        }
    }
}