
import { AnimalModel } from '../../models';

export enum ActionTypes {
    SET_ERROR = "SET_ERROR",   
    SET_SUCCESS = "SET_SUCCESS", 
    SET_INPROCESS = "SET_INPROCESS",
    SET_OPEN_FORM_ADD_NEW_ANIMAL = "SET_OPEN_FORM_ADD_NEW_ANIMAL",
    ADD_NEW_ANIMAL_REQUEST = "ADD_NEW_ANIMAL_REQUEST",
    ADD_NEW_ANIMAL_SUCCESS = "ADD_NEW_ANIMAL_SUCCESS",
    ADD_NEW_ANIMAL_ERROR = "ADD_NEW_ANIMAL_ERROR", 
    GET_ALL_ANIMALS_REQUEST = "GET_ALL_ANIMALS_REQUEST",
    GET_ALL_ANIMALS_SUCCESS = "GET_ALL_ANIMALS_SUCCESS",
    GET_ALL_ANIMALS_ERROR = "GET_ALL_ANIMALS_ERROR",
}

export type Action =
    { type: ActionTypes.SET_ERROR, payload: string } |
    { type: ActionTypes.SET_SUCCESS, payload: string } |
    { type: ActionTypes.SET_INPROCESS, payload: boolean } |
    { type: ActionTypes.SET_OPEN_FORM_ADD_NEW_ANIMAL, payload: boolean } |
    { type: ActionTypes.ADD_NEW_ANIMAL_REQUEST } |
    { type: ActionTypes.ADD_NEW_ANIMAL_SUCCESS, payload: AnimalModel } |
    { type: ActionTypes.ADD_NEW_ANIMAL_ERROR, payload: string } |
    { type: ActionTypes.GET_ALL_ANIMALS_REQUEST } |
    { type: ActionTypes.GET_ALL_ANIMALS_SUCCESS, payload: Array<AnimalModel> } |
    { type: ActionTypes.GET_ALL_ANIMALS_ERROR, payload: string };
