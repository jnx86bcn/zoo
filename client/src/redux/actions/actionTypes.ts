
import { AnimalModel } from '../../models';

export enum ActionTypes {
    SET_ERROR = "SET_ERROR",   
    SET_SUCCESS = "SET_SUCCESS", 
    SET_INPROCESS = "SET_INPROCESS",
    ADD_ITEM_REQUEST = "ADD_ITEM_REQUEST",
    ADD_ITEM_SUCCESS = "ADD_ITEM_SUCCESS",
    ADD_ITEM_ERROR = "ADD_ITEM_ERROR", 
    GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST",
    GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS",
    GET_ITEMS_ERROR = "GET_ITEMS_ERROR",
}

export type Action =
    { type: ActionTypes.SET_ERROR, payload: string } |
    { type: ActionTypes.SET_SUCCESS, payload: string } |
    { type: ActionTypes.SET_INPROCESS, payload: boolean } |
    { type: ActionTypes.ADD_ITEM_REQUEST } |
    { type: ActionTypes.ADD_ITEM_SUCCESS, payload: AnimalModel } |
    { type: ActionTypes.ADD_ITEM_ERROR, payload: string } |
    { type: ActionTypes.GET_ITEMS_REQUEST } |
    { type: ActionTypes.GET_ITEMS_SUCCESS, payload: Array<AnimalModel> } |
    { type: ActionTypes.GET_ITEMS_ERROR, payload: string };
