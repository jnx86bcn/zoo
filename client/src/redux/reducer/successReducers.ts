import {Reducer, combineReducers} from 'redux';

import { GeneralState } from '../state';
import { Action, ActionTypes } from '../actions';

const initState = new GeneralState();

export const successReducer: Reducer<GeneralState> = (state: GeneralState = initState, action: Action): GeneralState => {

    switch (action.type) {
        case ActionTypes.SET_ERROR:
            return state.setError(action.payload);
        case ActionTypes.SET_SUCCESS:
            return state.setSuccess(action.payload);
        case ActionTypes.SET_INPROCESS:
            return state.setInProcess(action.payload);
        default: 
            return state;
    };
}
