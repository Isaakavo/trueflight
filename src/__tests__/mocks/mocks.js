export const initialStateMock = {
  airport: [],
  dates: {
    maxDate: '2023-03-22',
    minDate: '2022-03-22',
  },
  loading: 'pending' ,
};

export const inputsMock = {
  loading: 'succeded',
  airport: ['MX', 'MID', 'TOR'],
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
  dates: {
    maxDate: '',
    minDate: '',
  },
}

export const inputsDefault = {
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

export const bookingDefault = {
  firstname: '',
  lastname: '',
  surname: '',
  address: '',
  email: '',
  coupon: '',
  reservations: [],
};
