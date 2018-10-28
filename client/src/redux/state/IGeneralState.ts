import { AnimalModel } from '../../models'

/** Interface Store Global Canal Comercial */
export interface IGeneralState {

    item: AnimalModel;
    items: Array<AnimalModel>;
    
    errorData: string;
    successData: string;
    inProcess: boolean;
    
}