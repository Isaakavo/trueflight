import { createStore, applyMiddleware,combineReducers } from 'redux';
import { asyncMiddleware } from './middleware/asyncMiddleware';

import {
  availableDatesReducer,
  airportsReducer,
  bookingReducer,
  flightReducer,
} from './reducers/dataReducer';
import {
  fetchingAirportsReducer,
  fetchingFlightsReducer,
} from './reducers/uiReducer';


const reducer = combineReducers({
  dates: availableDatesReducer,
  airports: combineReducers({
    reducer: airportsReducer,
    fetchStatus: fetchingAirportsReducer,
  }),
  booking: bookingReducer,
  flights: combineReducers({
    flightReducer,
    fetchingFlightsReducer,
  }),
});

export const store = createStore(reducer, applyMiddleware(asyncMiddleware));

