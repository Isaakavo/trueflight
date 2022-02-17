import { useState, useEffect } from 'react';
import { fetchDates, fetchAirports } from '../features/reducer';
import { useDispatch, useSelector } from 'react-redux';

import InputAirport from './InputAirport';
import AirportList from './AirportsList';
import InputCalendar from './InputCalendar';
import InputPassagers from './InputPassagers';

import { availableAirports, selectDates } from '../features/airportReducer';

import '../styles/dashboard.css';

const airportsStatus = (state) => state.airports.fetchStatus;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { input, hideR, passagers } = useSelector(availableAirports);
  const dates = useSelector(selectDates);
  const { loading } = useSelector(airportsStatus);

  const handleSubmit = () => {
    if (
      dates.comeback &&
      dates.departure &&
      input.destination &&
      input.origin
    ) {
      const obj = { ...input, dates, passagers };
      console.log({ obj });
      dispatch({ type: 'booking/set', payload: obj });
    }
  };

  useEffect(() => {
    dispatch(fetchDates());
    dispatch(fetchAirports());
  }, [dispatch]);

  if (loading === 'pending' || loading === 'idle') {
    return <h1>Loading</h1>;
  }

  return (
    <div className='wrapper'>
      <div className='inputs-container'>
        <InputAirport />
        {!hideR ? <AirportList /> : null}
        {hideR ? <InputCalendar /> : null}
        {hideR ? <InputPassagers /> : null}
        <button
          className='search-button'
          hidden={!hideR}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
