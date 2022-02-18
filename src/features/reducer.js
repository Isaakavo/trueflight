// import axios from 'axios';
import { combineReducers } from 'redux';
import { firestore } from '../firebaseConfig';

export const asyncMiddleware = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  next(action);
};

export const fetchDates = () => async (dispatch) => {
  dispatch({ type: 'dates/pending' });
  try {
    const collection = await firestore.collection('available-dates').get();
    const dates = [];
    collection.forEach((x) => dates.push(x.data().availableDates));
    dispatch({ type: 'dates/fulfilled', payload: dates[0] });
  } catch (error) {
    dispatch({ type: 'dates/error', error: error.message });
    console.log(error.message);
  }
};

export const fetchAirports = () => async (dispatch) => {
  dispatch({ type: 'airports/pending' });
  try {
    const collection = await firestore.collection('airports').get();
    const airports = [];
    collection.forEach((x) => {
      airports.push(...x.data().airports);
    });
    dispatch({ type: 'airports/fulfilled', payload: airports });
  } catch (error) {
    dispatch({ type: 'airports/error', error: error.message });
  }
};

export const fetchFlights = () => async (dispatch) => {
  dispatch({ type: 'flights/pending' });
  try {
    const collection = await firestore.collection('available-fligths').get();
    const flights = [];
    collection.forEach((x) => {
      flights.push(x.data());
    });
    dispatch({ type: 'flights/fulfilled', payload: flights[0] });
  } catch (error) {
    dispatch({ type: 'flights/error', error: error.message });
    console.log(error.message);
  }
};

const availableDatesReducer = (
  state = { departure: '', comeback: '' },
  action
) => {
  const { payload } = action;
  switch (action.type) {
    case 'dates/fulfilled':
      const minDate = payload[0];
      const maxDate = payload[payload.length - 1];
      return { ...state, minDate, maxDate };

    case 'dates/selectdate':
      return { ...state, ...payload };
    default:
      return state;
  }
};

const airportReducerDefault = {
  input: { departure: '', origin: { code: '' }, destination: { code: '' } },
  hideR: true,
  passagers: { number: 1 },
};

const airportsReducer = (state = airportReducerDefault, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'airports/fulfilled': {
      return { ...state, airport: payload };
    }
    case 'airports/selected':
      return { ...state, selected: payload };

    case 'airports/inputs':
      return { ...state, input: payload };

    case 'airports/passagers':
      return { ...state, ...payload };

    case 'airports/hidelist':
      return { ...state, ...payload };

    case 'airports/reset':
      return airportReducerDefault;

    default:
      return state;
  }
};

const bookingReducer = (state = [], action) => {
  const { payload } = action;
  switch (action.type) {
    case 'booking/set':
      return [...state, { ...payload }];

    case 'booking/final':
      return { ...state, ...payload };

    case 'booking/delete':
      const removedItem = state.filter((x) => x.id !== payload);
      return removedItem;

    case 'booking/reset':
      return [];

    default:
      return state;
  }
};

const flightReducer = (state = {}, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'flights/fulfilled':
      return { ...state, payload };

    case 'flights/senddata':
      return { ...state, payload };

    default:
      return state;
  }
};

const fetchingAirportsReducer = (
  state = { loading: 'idle', error: null },
  action
) => {
  switch (action.type) {
    case 'airports/pending':
      return { ...state, loading: 'pending' };
    case 'airports/fulfilled':
      return { ...state, loading: 'succeeded' };
    case 'airports/error':
      return { error: action.error, loading: 'rejected' };
    default:
      return state;
  }
};

const fetchingFlightsReducer = (
  state = { loading: 'idle', error: null },
  action
) => {
  switch (action.type) {
    case 'flights/pending':
      return { ...state, loading: 'pending' };
    case 'flights/fulfilled':
      return { ...state, loading: 'succeded' };
    case 'flights/error':
      return { error: action.error, loading: 'rejected' };
    default:
      return state;
  }
};

export const reducer = combineReducers({
  dates: availableDatesReducer,
  airports: combineReducers({
    reducer: airportsReducer,
    fetchStatus: fetchingAirportsReducer,
  }),
  booking: bookingReducer,
  flights: combineReducers({
    flightReducer,
    fetchingFlightsReducer
  }),
});
