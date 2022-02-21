import { LOADING_UI, STOP_LOADING_UI, ERROR_UI } from './types';


const defaultUi = {
  loading: 'idle',
  error: null
}

export const uiReducer = (state = defaultUi, action) => {
  const { type } = action;
  switch (type) {
    case LOADING_UI:
      return { ...state, loading: 'pending' };
    case STOP_LOADING_UI:
      return { ...state, loading: 'succeed' };
    case ERROR_UI:
      return { error: action.error, loading: 'rejected' };

    default:
      return state;
  }
};

export const fetchingAirportsReducer = (
  state = { loading: 'idle', error: null },
  action
) => {
  switch (action.type) {
    case 'airports/pending':
      return { ...state, loading: 'pending' };
    case 'airports/fulfilled':
      return { ...state, loading: 'succeed' };
    case 'airports/error':
      return { error: action.error, loading: 'rejected' };
    default:
      return state;
  }
};

export const fetchingFlightsReducer = (
  state = { loading: 'idle', error: null },
  action
) => {
  switch (action.type) {
    case 'flights/pending':
      return { ...state, loading: 'pending' };
    case 'flights/fulfilled':
      return { ...state, loading: 'succeed' };
    case 'flights/error':
      return { error: action.error, loading: 'rejected' };
    default:
      return state;
  }
};
