
import { ActionTypes, Action } from './actionTypes';

import { AnimalModel } from '../../models';

import { Services } from '../../services';

import { setErrorMessage, setSuccessMessage, setInProcess } from './successActions';


/**
 * Actions to GET Projects
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

    let svc = new Services();

    return async (dispatch: any) => {

        // Launche request actions
        dispatch(setInProcess(true));
        dispatch(getItems_Request());

        // Generate array with Projects
        let arrayAnimals: Array<AnimalModel> = new Array<AnimalModel>();

        svc.getAllItems()
        .then((data)=>{
            dispatch(setSuccessMessage(""));
            dispatch(getItems_Success(data));
        }).catch((err)=>{
            dispatch(setErrorMessage(""));
            dispatch(getItems_Error(err));
        });

    }
}
