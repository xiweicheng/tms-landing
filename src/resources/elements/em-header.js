import { bindable, containerless } from 'aurelia-framework';

@containerless
export class EmHeader {

    @bindable value;

    valueChanged(newValue, oldValue) {

    }
}

