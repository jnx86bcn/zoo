import {Reducer, combineReducers} from 'redux';

import { GeneralState } from '../state';
import { Action, ActionTypes } from '../actions';

const initState = new GeneralState();

export const projectsReducer: Reducer<GeneralState> = (state: GeneralState = initState, action: Action): GeneralState => {

    switch (action.type) {
        case ActionTypes.GET_ITEMS_REQUEST:
            return state;
        case ActionTypes.GET_ITEMS_SUCCESS:
            return state.getAllItems(action.payload);
        case ActionTypes.GET_ITEMS_ERROR:
            return state;
        case ActionTypes.ADD_ITEM_REQUEST:
            return state;
        case ActionTypes.ADD_ITEM_SUCCESS:
            return state.addItem(action.payload);
        case ActionTypes.ADD_ITEM_ERROR:
            return state;
        default: 
            return state;
    };
}
