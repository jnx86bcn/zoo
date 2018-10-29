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

    constructor() 
    {
        this.Name = 'Elephant';
        this.Kingdom = 'Animalia';
        this.Extinct = true;
        this.Region = 'Africa';
    }

}