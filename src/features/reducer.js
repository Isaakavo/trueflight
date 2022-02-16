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
    console.log(error);
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

const availableDatesReducer = (state = {}, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'dates/fulfilled':
      const minDate = payload[0];
      const maxDate = payload[payload.length - 1];
      return { ...state, minDate, maxDate };

    case 'dates/selectdate':
      debugger;
      return { ...state, payload };
    default:
      return state;
  }
};

const airportsReducer = (state = {}, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'airports/fulfilled': {
      return { airport: action.payload };
    }
    case 'airports/selected':
      return { ...state, selected: action.payload };

    case 'airports/inputs':
      debugger;
      return { ...state, input: action.payload };

    case 'airports/hidelist':
      debugger;
      return { ...state, payload };

    default:
      return state;
  }
};

const bookingReducer = (state = {}, action) => {
  switch (action.type) {
    case 'booking/set':
      return action.payload;

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
});
