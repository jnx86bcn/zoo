import * as Immutable from 'immutable';

import { AnimalModel } from '../../models';

import { IGeneralState } from '.';


export const initialState: IGeneralState = {
    
    item: new AnimalModel(),
    items: [],
    
    errorData: '',
    successData: '',
    inProcess: false,
 
};

//Immutable State.
export class GeneralState extends Immutable.Record(initialState) implements IGeneralState {

    //Getters
    public readonly item: AnimalModel;
    public readonly items: Array<AnimalModel>;

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
    public getAllItems(items: Array<AnimalModel>): GeneralState {
        return this.set("items", items) as GeneralState;
    }

    public addItem(item: AnimalModel): GeneralState {
        return this.set("item", item) as GeneralState;
    }

}