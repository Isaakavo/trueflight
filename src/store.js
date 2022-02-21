import { createStore, applyMiddleware,combineReducers } from 'redux';
import { asyncMiddleware } from './middleware/asyncMiddleware';


import { dataReducer } from './reducers/dataReducer';
import { uiReducer } from './reducers/uiReducer';

const reducer = combineReducers({
  data: dataReducer,
  ui: uiReducer
})

export const store = createStore(reducer, applyMiddleware(asyncMiddleware));

