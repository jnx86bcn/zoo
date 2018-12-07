import { AnimalModel } from "../../models";

export interface INewFormAnimalState {
    animal: AnimalModel;
    formIsOpen:boolean;
}