import { ModuleFactory } from '../../dist';
import { ContainerComponent } from './container/container.component';
import { ChildComponent } from './child/child.component';
import { ChildWithParamsComponent } from './child-with-params/child-with-params.component';

const vivi = new ModuleFactory({
    componentConstructors: [
        { constructor: ContainerComponent },
        { constructor: ChildComponent },
        { constructor: ChildWithParamsComponent }
    ],
    rootComponent: ContainerComponent
});