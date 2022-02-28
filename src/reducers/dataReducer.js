import {
  SET_AIPORTS,
  SET_AIRPORTS_DATES,
  SET_BOOKING,
  DELETE_BOOKING,
  RESET_BOOKING,
  SET_FLIGHTS,
  RESET_FLIGHTS,
  SET_INPUTS,
} from './types';

const airportReducerDefault = {
  airport: [],
  dates: {
    allDates: [],
    comeback: '',
    departure: '',
    maxDate: '',
    minDate: '',
  },
};

const inputsDefault = {
  origin: {
    code: '',
    name: '',
  },
  destination: {
    code: '',
    name: '',
  },
  departure: '',
  passengers: { number: 0 },
  route: '',
};

const bookingDefault = {
  firstname: '',
  lastname: '',
  surname: '',
  address: '',
  email: '',
  coupon: '',
  reservations: [],
};

const defaultState = {
  airports: airportReducerDefault,
  inputs: {},
  booking: bookingDefault,
  flights: {},
};

export const dataReducer = (state = defaultState, action) => {
  const { payload, type } = action;
  switch (type) {
    //Input airport select cases
    case SET_AIPORTS:
      return {
        ...state,
        airports: { ...state.airports, airport: [...payload] },
      };

    // //Dates cases
    case SET_AIRPORTS_DATES:
      const minDate = payload[0];
      const maxDate = payload[payload.length - 1];
      return {
        ...state,
        airports: {
          ...state.airports,
          dates: { allDates: [...payload], minDate, maxDate },
        },
      };

    //Booking cases
    case SET_BOOKING:
      return {
        ...state,
        inputs: inputsDefault,
        flights: [],
        booking: {
          ...state.booking,
          reservations: [...state.booking.reservations, payload],
        },
      };

    case 'setTickets':
      return {
        ...state,
        inputs: inputsDefault,
        flights: [],
        booking: { ...payload },
      };

    case DELETE_BOOKING:
      const removedItem = state.booking.reservations.filter(
        (x) => x.id + x.dates.departure !== payload
      );
      return {
        ...state,
        booking: {
          ...state.booking,
          reservations: removedItem,
        },
      };
    case RESET_BOOKING:
      return {
        ...state,
        booking: bookingDefault,
      };

    //Flights cases
    case SET_FLIGHTS:
      return { ...state, flights: { ...state.flights, ...payload } };
    case RESET_FLIGHTS:
      return {
        ...state,
        flights: {},
      };

    case SET_INPUTS:
      return {
        ...state,
        inputs: { ...payload },
      };
    default:
      return state;
  }
};
