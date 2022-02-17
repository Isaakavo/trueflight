import axios from 'axios';
import { combineReducers } from 'redux';

// const initialState = {
//   availableDates: {},
//   airports: {},
// };

export const asyncMiddleware = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  next(action);
};

export const fetchDates = () => async (dispatch) => {
  dispatch({ type: 'dates/pending' });
  try {
    const {
      data: {
        data: { availableDates },
      },
    } = await axios.get('http://localhost:3001/available-dates');
    const dates = availableDates.slice(0, 100);
    dispatch({ type: 'dates/fulfilled', payload: dates });
  } catch (error) {
    dispatch({ type: 'dates/error', error: error.message });
  }
};

export const fetchAirports = () => async (dispatch) => {
  dispatch({ type: 'airports/pending' });
  try {
    const {
      data: {
        data: { airports },
      },
    } = await axios.get('http://localhost:3001/airports');
    dispatch({ type: 'airports/fulfilled', payload: airports });
  } catch (error) {
    dispatch({ type: 'airports/error', error: error.message });
  }
};

export const fetchFlights = () => async (dispatch) => {
  dispatch({ type: 'flights/pending' });
  try {
    const {
      data: {
        data: { routes },
      },
    } = await axios.get('http://localhost:3001/available-fligths');
    dispatch({ type: 'flights/fulfilled', payload: routes });
  } catch (error) {
    dispatch({ type: 'flights/error', error: error.message });
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
  input: { departure: '' },
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
      debugger;
      return { ...state, input: payload };

    case 'airports/passagers':
      return { ...state, ...payload };

    case 'airports/hidelist':
      return { ...state, ...payload };

    default:
      return state;
  }
};

const bookingReducer = (state = [], action) => {
  const { payload } = action;
  switch (action.type) {
    case 'booking/set':
      debugger;
      return [...state, { ...payload }];

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

export const reducer = combineReducers({
  dates: availableDatesReducer,
  airports: combineReducers({
    reducer: airportsReducer,
    fetchStatus: fetchingAirportsReducer,
  }),
  booking: bookingReducer,
  flights: flightReducer,
});
