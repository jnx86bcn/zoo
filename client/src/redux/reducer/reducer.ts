import { combineReducers} from 'redux'
import {i18nState} from 'redux-i18n' 

import { projectsReducer, successReducer } from '.';

const appReducer = combineReducers({
    i18nState, 
    projectsReducer, 
    successReducer
})

export default appReducer