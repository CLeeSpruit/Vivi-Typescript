import { ViviServiceConstructor, Service } from '../models';
import { ApplicationEventService } from './';
import { FactoryService } from './factory.service';

export const loadViviServices: Array<ViviServiceConstructor<Service>> = [
    // Tier 0
    <ViviServiceConstructor<ApplicationEventService>>{ constructor: ApplicationEventService },
    <ViviServiceConstructor<FactoryService>>{ constructor: FactoryService }
];