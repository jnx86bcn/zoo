import {IFormField} from './IFormField';

export class IFormFieldDate extends IFormField {

    public value: Date;

    constructor(internalName: string) {

        super();

        this.value = new Date();
        this.internalName = internalName;
    }
}