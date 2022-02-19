import { firestore } from '../firebaseConfig';

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

export const fetchDates = () => async (dispatch) => {
  dispatch({ type: 'dates/pending' });
  try {
    const collection = await firestore.collection('available-dates').get();
    const dates = [];
    collection.forEach((x) => dates.push(x.data().availableDates));
    dispatch({ type: 'dates/fulfilled', payload: dates[0] });
  } catch (error) {
    dispatch({ type: 'dates/error', error: error.message });
  }
};

export const fetchFlights = (code) => async (dispatch) => {
  dispatch({ type: 'flights/pending' });
  try {
    const collection = await firestore
      .collection('fligths')
      .where('code', '==', code)
      .get();
    const flights = [];
    collection.forEach((x) => {
      flights.push(x.data());
    });
    dispatch({ type: 'flights/fulfilled', payload: flights[0] });
  } catch (error) {
    dispatch({ type: 'flights/error', error: error.message });
    console.log(error);
  }
};