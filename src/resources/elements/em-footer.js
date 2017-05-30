import { bindable, containerless } from 'aurelia-framework';

@containerless
export class EmFooter {

    @bindable value;

    valueChanged(newValue, oldValue) {

    }
}

