import * as Immutable from 'immutable';

import { AnimalModel } from '../../models';

import { IGeneralState } from '.';


export const initialState: IGeneralState = {
    
    animal: new AnimalModel(),
    animals: [],
    
    errorData: '',
    successData: '',
    inProcess: false,
 
};

//Immutable State.
export class GeneralState extends Immutable.Record(initialState) implements IGeneralState {

    //Getters
    public readonly animal: AnimalModel;
    public readonly animals: Array<AnimalModel>;

    public readonly errorData: string;
    public readonly successData: string;
    public readonly inProcess: boolean;
    
    // Success METHODS
    public setError(errorData: string): GeneralState {
        return this.set("errorData", errorData) as GeneralState;
    }

    public setSuccess(successData: string): GeneralState {
        return this.set("successData", successData) as GeneralState;
    }

    public setInProcess(inProcess: boolean): GeneralState {
        return this.set("inProcess", inProcess) as GeneralState;
    }

    // Project METHODS 
    public getAllAnimals(animals: Array<AnimalModel>): GeneralState {
        return this.set("animals", animals) as GeneralState;
    }

    public addNewAnimal(animal: AnimalModel): GeneralState {
        return this.set("animal", animal) as GeneralState;
    }

}