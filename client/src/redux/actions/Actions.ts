
import { ActionTypes, Action } from './actionTypes';

import { AnimalModel } from '../../models';

import { Services } from '../../services';

import { setErrorMessage, setSuccessMessage, setInProcess } from './successActions';


/**
 * Actions to GET all items
 */
const getAllAnimals_Request = (): Action => ({
    type: ActionTypes.GET_ALL_ANIMALS_REQUEST
});
const getAllAnimals_Success = (animals: Array<AnimalModel>): Action => ({
    type: ActionTypes.GET_ALL_ANIMALS_SUCCESS,
    payload: animals
});
const getAllAnimals_Error = (error: Error): Action => ({
    type: ActionTypes.GET_ALL_ANIMALS_ERROR,
    payload: error.message
});


/**
 * Get all projects in list
 * @param listName projects
 */
export function getAllAnimals() {

    return async (dispatch: any) => {

        // Launche request actions
        dispatch(setInProcess(true));
        dispatch(getAllAnimals_Request());

        Services.getAllItems()
        .then((data: Array<AnimalModel>)=>{
            data.forEach(item=>{
                item.Birth = new Date(item.Birth.match(/\d+/)[0] * 1);
                item.Death = new Date(item.Death.match(/\d+/)[0] * 1);
            })
            dispatch(setInProcess(false));
            dispatch(setSuccessMessage(""));
            dispatch(getAllAnimals_Success(data));
        }).catch((err)=>{
            dispatch(setInProcess(false));
            dispatch(setErrorMessage(""));
            dispatch(getAllAnimals_Error(err));
        });

    }
}


const addNewAnimal_Request = (): Action => ({
    type: ActionTypes.ADD_NEW_ANIMAL_REQUEST
});
const addNewAnimal_Success = (animals: AnimalModel): Action => ({
    type: ActionTypes.ADD_NEW_ANIMAL_SUCCESS,
    payload: animals
});
const addNewAnimal_Error = (error: Error): Action => ({
    type: ActionTypes.ADD_NEW_ANIMAL_ERROR,
    payload: error.message
});


export function addNewAnimal(item: AnimalModel) {

    return async (dispatch: any) => {

        // Launche request actions
        dispatch(setInProcess(true));
        dispatch(addNewAnimal_Request());

        Services.addItem(item)
        .then((data: AnimalModel)=>{
            dispatch(setInProcess(false));
            dispatch(setSuccessMessage(""));
            dispatch(addNewAnimal_Success(data));
            dispatch(getAllAnimals());
        }).catch((err)=>{
            dispatch(setInProcess(false));
            dispatch(setErrorMessage(""));
            dispatch(addNewAnimal_Error(err));
        });

    }
}