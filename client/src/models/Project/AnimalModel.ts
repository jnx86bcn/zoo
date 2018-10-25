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

        this.Name = new IFormFieldString('MDB_Name');
        this.Kingdom = new IFormFieldString('MDB_Kingdom');
        this.Class = new IFormFieldString('MDB_Class');
        this.ConservationStatus = new IFormFieldString('MDB_ConservationStatus');
        this.Region = new IFormFieldString('MDB_Status')
        this.Extinct = new IFormFieldBoolean('MDB_Extinct');

    }

}