import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { asyncMiddleware } from './middleware/asyncMiddleware';

import { dataReducer } from './reducers/dataReducer';
import { uiReducer } from './reducers/uiReducer';

const middleware = [thunk, asyncMiddleware];

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const reducer = combineReducers({
  data: dataReducer,
  ui: uiReducer,
});

export const store = createStore(
  reducer,
  {},
  enhancer
);
