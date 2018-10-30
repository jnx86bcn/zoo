import { IFormFieldBoolean, IFormFieldString } from 'Base';

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
        this.Name = "name";
        this.Kingdom = "Kingdom";
        this.Class = "Class";
        this.ConservationStatus = "ConservationStatus";
        this.Region = "Region";
        this.Extinct = false;
        this.Birth = new Date();
        this.Death = new Date();
    }

}