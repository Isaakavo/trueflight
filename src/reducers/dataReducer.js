import {
  SET_AIPORTS,
  SET_AIPORTS_SELECTED,
  SET_AIPORTS_INPUT,
  SET_AIPORTS_PASSANGERS,
  SET_AIPORTS_HIDELIST,
  SET_AIRPORTS_RESETSELECTED,
  RESET_AIPORTS,
  SET_AIRPORTS_DATES,
  SET_AIRPORTS_SELECTED_DATE,
  RESET_AIRPORTS_DATES,
  SET_BOOKING,
  DELETE_BOOKING,
  RESET_BOOKING,
  SET_FLIGHTS,
  RESET_FLIGHTS,
} from './types';

const airportReducerDefault = {
  airport: [],
  input: { departure: '', origin: { code: '' }, destination: { code: '' } },
  passengers: { number: 1 },
  hideList: true,
  selected: undefined,
  dates: {
    allDates: [],
    comeback: '',
    departure: '',
    maxDate: '',
    minDate: '',
  },
};

const defaultState = {
  airport: airportReducerDefault,
  booking: [],
  flights: {},
};

export const dataReducer = (state = defaultState, action) => {
  const { payload, type } = action;
  switch (type) {
    //Input airport select cases
    case SET_AIPORTS:
      return { ...state, airport: { ...state.airport, airport: [...payload] } };
    case SET_AIPORTS_SELECTED:
      return { ...state, airport: { ...state.airport, selected: payload } };
    case SET_AIPORTS_INPUT:
      const { origin, destination } = payload;
      const route = origin.code + '-' + destination.code;
      return {
        ...state,
        airport: {
          ...state.airport,
          input: { route, origin: origin, destination: destination },
        },
      };
    case SET_AIPORTS_PASSANGERS:
      return {
        ...state,
        airport: { ...state.airport, ...payload },
      };
    case SET_AIPORTS_HIDELIST:
      return { ...state, airport: { ...state.airport, ...payload } };
    case SET_AIRPORTS_RESETSELECTED:
      return {
        ...state,
        airport: {
          ...state.airport,
          selected: undefined,
          input: airportReducerDefault.input,
          passengers: airportReducerDefault.passengers
        },
      };
    case RESET_AIPORTS:
      return airportReducerDefault;

    //Dates cases
    case SET_AIRPORTS_DATES:
      const minDate = payload[0];
      const maxDate = payload[payload.length - 1];
      return {
        ...state,
        airport: {
          ...state.airport,
          dates: { allDates: [...payload], minDate, maxDate },
        },
      };
    case SET_AIRPORTS_SELECTED_DATE:
      return {
        ...state,
        airport: {
          ...state.airport,
          dates: { ...state.airport.dates, ...payload },
        },
      };
    case RESET_AIRPORTS_DATES:
      return {
        ...state,
        airport: {
          ...state.airport,
          dates: airportReducerDefault.dates,
        },
      };
      
    //Booking cases
    case SET_BOOKING:
      return {
        ...state,
        booking: [...state.booking, { ...payload }],
      };

    case DELETE_BOOKING:
      const removedItem = state.booking.filter((x) => x.id + x.dates.departure !== payload);
      return { ...state, booking: removedItem };
    case RESET_BOOKING:
      return {
        ...state,
        booking: [],
      };

    //Flights cases
    case SET_FLIGHTS:
      return { ...state, flights: { ...state.flights, ...payload } };
    case RESET_FLIGHTS:
      return {
        ...state,
        flights: {},
      };
    default:
      return state;
  }
};
