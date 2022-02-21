import { firestore } from '../firebaseConfig';

export const fetchAirports = () => async (dispatch) => {
  dispatch({ type: 'ui/pending' });
  try {
    const collection = await firestore.collection('airports').get();
    const airports = [];
    collection.forEach((x) => {
      airports.push(...x.data().airports);
    });
    dispatch({ type: 'airports/fulfilled', payload: airports });
    dispatch({ type: 'ui/fulfilled' });
  } catch (error) {
    dispatch({ type: 'ui/error', error: error.message });
  }
};

export const fetchDates = () => async (dispatch) => {
  dispatch({ type: 'ui/pending' });
  try {
    const collection = await firestore.collection('available-dates').get();
    const dates = [];
    collection.forEach((x) => dates.push(x.data().availableDates));
    dispatch({ type: 'dates/fulfilled', payload: dates[0] });
    dispatch({ type: 'ui/fulfilled' });
  } catch (error) {
    dispatch({ type: 'ui/error', error: error.message });
  }
};

export const fetchFlights = (code) => async (dispatch) => {
  dispatch({ type: 'ui/pending' });
  try {
    const collection = await firestore
      .collection('flights')
      .where('code', '==', code)
      .get();
    const flights = [];
    collection.forEach((x) => {
      flights.push(x.data());
    });
    if (flights[0] === undefined) {
      dispatch({ type: 'ui/error' });
      return;
    }
    dispatch({ type: 'flights/fulfilled', payload: flights[0] });
    dispatch({ type: 'ui/fulfilled' });
  } catch (error) {
    dispatch({ type: 'ui/error', error: error.message });
    console.log(error);
  }
};
