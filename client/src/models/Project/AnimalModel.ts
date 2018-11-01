import { IFormFieldBoolean, IFormFieldString } from '../Base';

export class AnimalModel {

    // Fields Projects
    Name: IFormFieldString;
    Kingdom: IFormFieldString;
    Class: IFormFieldString;
    ConservationStatus: IFormFieldString;
    Region: IFormFieldString;
    Extinct: IFormFieldBoolean;
    Birth: IFormFieldString;
    Death: IFormFieldString;

    constructor() {
        this.Name = new IFormFieldString('Name');
        this.Kingdom = new IFormFieldString('Kingdom');
        this.Class = new IFormFieldString('Class');
        this.ConservationStatus = new IFormFieldString('ConservationStatus');
        this.Region = new IFormFieldString('Region');
        this.Extinct = new IFormFieldBoolean('Extinct');
        this.Birth = new IFormFieldString('Birth');
        this.Death = new IFormFieldString('Death');
    }

}