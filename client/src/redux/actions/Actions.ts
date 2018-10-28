
import { ActionTypes, Action } from './actionTypes';

import { AnimalModel } from '../../models';

import { Services } from '../../services';

import { setErrorMessage, setSuccessMessage, setInProcess } from './successActions';


/**
 * Actions to GET all items
 */
const getItems_Request = (): Action => ({
    type: ActionTypes.GET_ITEMS_REQUEST
});
const getItems_Success = (animals: Array<AnimalModel>): Action => ({
    type: ActionTypes.GET_ITEMS_SUCCESS,
    payload: animals
});
const getItems_Error = (error: Error): Action => ({
    type: ActionTypes.GET_ITEMS_ERROR,
    payload: error.message
});


/**
 * Get all projects in list
 * @param listName projects
 */
export function getAllItems() {

    return async (dispatch: any) => {

        // Launche request actions
        dispatch(setInProcess(true));
        dispatch(getItems_Request());

        Services.getAllItems()
        .then((data: Array<AnimalModel>)=>{
            dispatch(setSuccessMessage(""));
            dispatch(getItems_Success(data));
        }).catch((err)=>{
            dispatch(setErrorMessage(""));
            dispatch(getItems_Error(err));
        });

    }
}


const addItem_Request = (): Action => ({
    type: ActionTypes.ADD_ITEM_REQUEST
});
const addItem_Success = (animals: AnimalModel): Action => ({
    type: ActionTypes.ADD_ITEM_SUCCESS,
    payload: animals
});
const addItem_Error = (error: Error): Action => ({
    type: ActionTypes.ADD_ITEM_ERROR,
    payload: error.message
});


export function addItem(item: AnimalModel) {

    return async (dispatch: any) => {

        // Launche request actions
        dispatch(setInProcess(true));
        dispatch(addItem_Request());

        Services.addItem(item)
        .then((data: AnimalModel)=>{
            dispatch(setSuccessMessage(""));
            dispatch(addItem_Success(data));
        }).catch((err)=>{
            dispatch(setErrorMessage(""));
            dispatch(addItem_Error(err));
        });

    }
}