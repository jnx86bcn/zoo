import { AnimalModel } from "../../models";

export interface INewFormAnimalState {
    animal: AnimalModel;
    openFromAddNewAnimal:boolean;
}