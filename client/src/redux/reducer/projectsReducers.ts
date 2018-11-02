import {Reducer, combineReducers} from 'redux';

import { GeneralState } from '../state';
import { Action, ActionTypes } from '../actions';

const initState = new GeneralState();

export const projectsReducer: Reducer<GeneralState> = (state: GeneralState = initState, action: Action): GeneralState => {

    switch (action.type) {
        case ActionTypes.GET_ALL_ANIMALS_REQUEST:
            return state;
        case ActionTypes.GET_ALL_ANIMALS_SUCCESS:
            return state.getAllAnimals(action.payload);
        case ActionTypes.GET_ALL_ANIMALS_ERROR:
            return state;
        case ActionTypes.SET_OPEN_FORM_ADD_NEW_ANIMAL:
            return state.setOpenFormAddNewAnimal(action.payload);
        case ActionTypes.ADD_NEW_ANIMAL_REQUEST:
            return state;
        case ActionTypes.ADD_NEW_ANIMAL_SUCCESS:
            return state.addNewAnimal(action.payload);
        case ActionTypes.ADD_NEW_ANIMAL_ERROR:
            return state;
        default: 
            return state;
    };
}
