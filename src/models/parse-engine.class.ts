import { ComponentIngredient } from './component-ingredient.class';
import { ModuleFactory, ViviComponentFactory } from 'factory';
import { Component } from './component.class';

export class ParseEngine {
    private static attributeBlackList = [
        'v-class',
        'v-if',
        'v-innerhtml',
        'vif-innerhtml',
        'vif-class'
    ];

    static parseNode(el: HTMLElement, data: Object): { el: HTMLElement, recipe: Array<ComponentIngredient> } {
        const newNode = this.assignAttributes(el, data);
        const recipe = this.createRecipe(newNode);
        return { el: newNode, recipe };
    }

    private static assignAttributes(ogNode: HTMLElement, data: Object): HTMLElement {
        const node = <HTMLElement>ogNode.cloneNode(true);
        // Get a list of all unique attributes
        const attributes = this.buildAttributeList(node);
        attributes.forEach(attr => {
            if (attr.startsWith('v-') && !this.attributeBlackList.find(bl => bl === attr)) {
                this.attributeParse(node, data, attr);
            }

            if (attr.startsWith('vif-') && !this.attributeBlackList.find(bl => bl === attr)) {
                this.attributeParseVif(node, data, attr);
            }
        });

        // Parse blacklist items
        this.attributeParse(node, data, 'v-class', (name, el, attr) => {
            const list = attr.split(' ');
            const parsed = list.map(li => {
                // Allow for data and non-data strings
                return ParseEngine.applyWithContext(li, data);
            });
            el.classList.add(...parsed);
        });

        this.attributeParse(node, data, 'v-innerHTML', (name, el, attr) => {
            // Simple replace
            el.innerHTML = ParseEngine.applyWithContext(attr, data);
        });

        this.attributeParse(node, data, 'v-if', (name, el, attr) => {
            if (!this.conditional(attr, data)) {
                el.remove();
            }
        });

        // Blacklisted vif
        this.attributeParseVif(node, data, 'vif-class', (name, el, attr) => {
            const list = attr.split(' ');
            const parsed = list.map(li => {
                // Allow for data and non-data strings
                return ParseEngine.applyWithContext(li, data);
            });
            el.classList.add(...parsed);
        });

        this.attributeParseVif(node, data, 'vif-innerHTML', (name, el, attr) => {
            el.innerHTML = ParseEngine.applyWithContext(attr, data);
        });

        return node;
    }

    private static buildAttributeList(node: HTMLElement, attributes: Set<string> = new Set<string>()): Set<string> {
        const attr = node.attributes;
        if (attr){
            for (let i = 0; i < attr.length; i++) {
                attributes.add(attr.item(i).name);
            }
        }

        node.childNodes.forEach(child => {
            this.buildAttributeList(<HTMLElement>child, attributes);
        });

        return attributes;
    }

    private static attributeParse(el: HTMLElement, data: Object, name: string, customParseFn?: (name: string, el: Element, attr: string) => void) {
        el.querySelectorAll('[' + name + ']').forEach(el => {
            const attr = el.getAttribute(name);

            if (customParseFn) {
                customParseFn(name, el, attr);
            } else {
                // Simple replace
                const newAttribute = name.replace('v-', '');
                el.setAttribute(newAttribute, ParseEngine.applyWithContext(attr, data));
            }
            // Rename to data to make parseable
            el.setAttribute('data-' + name, attr);
            el.removeAttribute(name);
        });
    }

    private static attributeParseVif(node: HTMLElement, data: Object, name: string, customParseFn?: (name: string, el: Element, attr: string) => void) {
        this.attributeParse(node, data, name, (attrName, el, attr) => {
            // Match against (conditional) ? trueResult : falseResult
            const match = attr.match(/(?<=\()(.*?)(?=\)\s*\?).*?(?<=\?)\s?(.*)/);
            if (match && match.length > 1) {
                const ternary = attr.match(/(?<=\()(.*?)(?=\)\s*\?).*?(?<=\?)\s?(.*?)\s?:\s?(.*)/);
                let result = null;
                if (ternary && ternary.length > 3) {
                    result = this.conditional(match[1], data) ? ternary[2] : ternary[3];
                } else {
                    result = this.conditional(match[1], data) ? match[2] || null : null;
                }
                // Do not bother setting if there's no result
                if (result === null) return;
                if (customParseFn) {
                    customParseFn(name, el, result);
                } else {
                    let newAttribute = name.replace('vif-', '');
                    el.setAttribute(newAttribute, ParseEngine.applyWithContext(result, data));
                }
            }
        });
    }

    private static createRecipe(node: HTMLElement) {
        const recipe = new Array<ComponentIngredient>();
        const moduleFactory: ModuleFactory = window.vivi;
        moduleFactory.getComponentRegistry().forEach(reg => {
            // Strip 'Component' off of name
            const name = reg.slice(0, reg.lastIndexOf('Component'));
            const els = node.querySelectorAll(name.toLowerCase());
            for (let i = 0; i < els.length; i++) {
                const el = els.item(i);
                const factory = moduleFactory.getFactoryByString(reg) as ViviComponentFactory<Component>;
                const ingredient = new ComponentIngredient(el.parentElement, factory, (<HTMLElement>el).dataset);
                recipe.push(ingredient);
            }
        });

        return recipe;
    }

    /* Generic fn */
    static conditional(condition: string, context: Object): boolean {
        return function (condition) {
            // Someone grab the holy water, we're going in
            try {
                return eval(condition);
            } catch (e) {
                return false;
            }
        }.call(context, condition);
    }

    private static applyWithContext(value: string, context: Object): string {
        return function(value) {
            try {
                return eval(value);
            } catch (e) {
                return value;
            }
        }.call(context, value);
    }
}