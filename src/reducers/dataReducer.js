const datesDefault = {
  comeback: '',
  departure: '',
  maxDate: '',
  minDate: '',
};

export const availableDatesReducer = (state = datesDefault, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'dates/fulfilled':
      const minDate = payload[0];
      const maxDate = payload[payload.length - 1];
      return { ...state, minDate, maxDate };

    case 'dates/selectdate':
      return { ...state, ...payload };
    case 'dates/reset':
      return datesDefault;
    default:
      return state;
  }
};

const airportReducerDefault = {
  input: { departure: '', origin: { code: '' }, destination: { code: '' } },
  passagers: { number: 0 },
  hideR: true,
  selected: undefined,
};

export const airportsReducer = (state = airportReducerDefault, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'airports/fulfilled': {
      return { ...state, airport: payload };
    }
    case 'airports/selected':
      return { ...state, selected: payload };

    case 'airports/inputs':
      const { origin, destination } = payload;
      const route = origin.code + '-' + destination.code;
      return {
        ...state,
        input: { route, origin: origin, destination: destination },
      };

    case 'airports/passagers':
      return { ...state, ...payload };

    case 'airports/hidelist':
      return { ...state, ...payload };

    case 'airports/resetselected':
      return {
        ...state,
        selected: undefined,
        input: airportReducerDefault.input,
      };

    case 'airports/reset':
      return airportReducerDefault;

    default:
      return state;
  }
};

export const bookingReducer = (state = [], action) => {
  const { payload } = action;
  switch (action.type) {
    case 'booking/set':
      return [...state, { ...payload }];

    case 'booking/delete':
      const removedItem = state.filter((x) => x.id !== payload);
      return removedItem;

    case 'booking/reset':
      return [];

    default:
      return state;
  }
};

export const flightReducer = (state = {}, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'flights/fulfilled':
      return { ...state, ...payload };

    case 'flights/senddata':
      return { ...state, payload };

    case 'flights/reset':
      return {};

    default:
      return state;
  }
};
