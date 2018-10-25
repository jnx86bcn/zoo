import { AnimalModel } from './AnimalModel';

export class ZooModel extends AnimalModel {

    // Fields Projects
    Id: string;
    Sector: number;
    Quantity: number;

    constructor() {
        super();
    }

    // Control Variables
    public genericErrors: string;
    public existError: boolean;

}