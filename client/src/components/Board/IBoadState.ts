import { AnimalModel } from '../../models';
export interface IBoardState {
    allAnimals : Array<AnimalModel>;
    openForm : boolean;
}