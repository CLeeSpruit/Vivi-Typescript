import * as uuid from 'uuid';
import { ApplicationListener, Listener } from '../events';
import { ComponentIngredient } from './component-ingredient.class';
import { ParseEngine } from './parse-engine.class';
import { ApplicationEventService, ListenerOptions } from '../services/application-event.service';
import { getElements } from '../decorators/element.decorator';
import { ModuleFactory, ViviComponentFactory } from 'factory';
import { ComponentParams } from './component-params.class';

export abstract class Component {
    id: string;
    componentName: string;
    template: string;
    style: string;
    element: HTMLElement;
    ogNode: HTMLElement;
    parsedNode: HTMLElement;
    parent: HTMLElement;
    listeners: Array<Listener | ApplicationListener> = new Array<Listener | ApplicationListener>();
    appEvents: ApplicationEventService;
    children: Array<ComponentIngredient> = new Array<ComponentIngredient>();

    constructor(public data: ComponentParams = {}, overwriteTemplate?: string, overwriteStyle?: string) {
        this.id = uuid();

        // Default Services
        this.appEvents = (<any>window).vivi.get(ApplicationEventService);

        // Get template and style file

        // Turns a name like "SearchBarComponent" to look for "search-bar.component.xyz"
        this.componentName = this.constructor.name.replace('Component', '').replace(/\B(?=[A-Z])/, '-').toLowerCase();
        /*
            @todo Allow for components to grab the module folder / multiple modules
            @body Currently file structure is root/component-name/component-name.component.xyz. Allow for components to be in directories based off of the module
        */
        const directory = this.componentName + '/' + this.componentName;

        // Sadly because of how context replacement plugin works for webpack, this can't really be functionalized
        if (overwriteTemplate) {
            this.template = overwriteTemplate;
        } else {
            try {
                this.template = require('vivi_application/' + directory + '.component.html');
            } catch (e) {
                 this.template = '';
            }
    
        }

        if (overwriteStyle) {
            try {
                this.style = require('vivi_application/' + directory + '.component.scss');
            } catch (e) {
                this.style = '';
            }
        }

        // Create Node that is named after the component class
        const el = document.createElement(this.componentName);
        el.id = this.id;
        el.innerHTML = this.template;
        this.ogNode = <HTMLElement>el.cloneNode(true);

        // Load data into template
        const parsed = ParseEngine.parseNode(el, this.data);
        this.parsedNode = parsed.el;
        this.children.push(...parsed.recipe);
    }

    append(parent: HTMLElement = document.body, doNotLoad?: boolean) {
        parent.appendChild(this.parsedNode);

        // Run load all, which loads children, then the load hook
        // Assign Element and class params
        this.element = document.getElementById(this.id);
        this.parent = parent;

        // Opt out of loading if this is an ingredient or is a re-attachment
        if (doNotLoad) return;

        this.loadAll();
    }

    loadAll() {
        if (!this.element) {
            console.error(`${this.componentName} needs to be appended before loading.`);
            return;
        }

        this.children.forEach(ingredient => ingredient.load());

        // Load in decorated elements
        const els = getElements(this);
        els.forEach(el => {
            this[el.propertyKey] = this.element.querySelector(el.selector);
            if (el.handlerFnName) {
                this.listen(this[el.propertyKey], el.eventType, this[el.handlerFnName]);
            }
        });

        // User Hook
        this.load();
    }

    redraw() {
        if (this.element) {
            // Remove 
            const newParse = ParseEngine.parseNode(this.ogNode, this.data);
            const newEl = newParse.el;
            const recipe = newParse.recipe;
            const oldNode = document.getElementById(this.id);
            this.parent.replaceChild(newEl, oldNode);
            this.parsedNode = newEl;
            this.element = document.getElementById(this.id);
        }
    }

    detach() {
        this.element.remove();
        this.parent = null;
    }

    /* Hooks */
    load() {
        // Placeholder hook for inherited classes
    }

    destroy() {
        this.listeners.forEach(listener => {
            listener.remove();
        });
        this.children.forEach(child => {
            child.component.destroy();
        });
    }

    /* Actions */
    listen(el: HTMLElement, eventType: string, cb: Function, options?: AddEventListenerOptions) {
        this.listeners.push(new Listener(eventType, el, cb.bind(this), options));
    }

    appListen(eventName: string, cb: Function, options?: ListenerOptions) {
        this.listeners.push(this.appEvents.createListener(eventName, cb.bind(this), options));
    }

    createChild(parentEl: HTMLElement, component: new (...args) => Component, data?: ComponentParams) {
        const factory = (<ModuleFactory>window.vivi).getFactory(component) as ViviComponentFactory<Component>;
        this.children.push(new ComponentIngredient(parentEl, factory, data));
    }
}