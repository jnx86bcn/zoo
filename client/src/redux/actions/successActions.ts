
import { ActionTypes, Action } from './actionTypes';

/**
 * Actions Error
 */
export const setErrorMessage = (message: string): Action => ({
    type: ActionTypes.SET_ERROR,
    payload: message
});

/**
 * Actions Success
 */
export const setSuccessMessage = (message: string): Action => ({
    type: ActionTypes.SET_SUCCESS,
    payload: message
});

/**
 * Actions InProcess
 */
export const setInProcess = (value: boolean): Action => ({
    type: ActionTypes.SET_INPROCESS,
    payload: value
});


