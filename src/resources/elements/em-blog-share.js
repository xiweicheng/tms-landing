import { bindable, containerless } from 'aurelia-framework';

@containerless
export class EmBlogShare {

    activate(params, routeConfig, navigationInstruction) {
        
        this.shareId = params.id;
        
    }
}
