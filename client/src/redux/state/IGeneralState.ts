import { AnimalModel } from '../../models'

/** Interface Store Global Canal Comercial */
export interface IGeneralState {

    animal: AnimalModel;
    animals: Array<AnimalModel>;
    openFormAddNewAnimal: boolean;
    
    errorData: string;
    successData: string;
    inProcess: boolean;
    
}