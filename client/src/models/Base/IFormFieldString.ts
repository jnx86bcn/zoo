import {IFormField} from './IFormField';

export class IFormFieldString extends IFormField {

    public value: string;

    constructor(internalName: string) {

        super();

        this.value = '';
        this.internalName = internalName;
    }
}
