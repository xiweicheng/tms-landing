import { bindable, containerless } from 'aurelia-framework';

@containerless
export class EmBlog {

    activate(params, routeConfig, navigationInstruction) {
        this.id = params.id;
    }
}
