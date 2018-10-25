import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import appReducer from '../reducer/reducer';

var newsSateStore: Store;

const logger = createLogger({
  collapsed: true
})

export default function configureStore() {
   return createStore(appReducer, applyMiddleware(thunk, logger));

   //Is debug Mode active
   //if ("production" !== process.env.NODE_ENV)
   //{
    //use loggerMiddleware in production
   //     newsSateStore = createStore(appReducer, applyMiddleware(thunk, logger));
   //     console.log('Debug MODE');
   // }
   // else {
        //do not use loggerMiddleware in production
   //     newsSateStore = createStore(appReducer, applyMiddleware(thunk));
   // }
   // return newsSateStore;// createStore(appReducer, applyMiddleware(thunk, logger));    
}