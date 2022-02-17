import { useEffect } from 'react';
import { fetchDates, fetchAirports } from '../features/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import InputAirport from './InputAirport';
import AirportList from './AirportsList';
import InputCalendar from './InputCalendar';
import InputPassagers from './InputPassagers';

import { availableAirports, selectDates } from '../features/airportReducer';
import '../styles/dashboard.css';

const airportsStatus = (state) => state.airports.fetchStatus;

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { input, hideR, passagers, airportData } =
    useSelector(availableAirports);
  const dates = useSelector(selectDates);
  const { loading } = useSelector(airportsStatus);

  const handleSubmit = () => {
    if (
      dates.comeback &&
      dates.departure &&
      input.destination &&
      input.origin
    ) {
      const route = input.origin.code + '-' + input.destination.code;
      const obj = { ...input, dates, passagers, airportData, route };
      // dispatch({ type: 'booking/set', payload: { data: obj, cartFlag: true } });
      // dispatch({ type: 'booking/set', payload: obj });
      // dispatch({ type: 'flights/senddata', payload: obj });
      navigate('/book');
    }
  };

  useEffect(() => {
    dispatch(fetchDates());
    dispatch(fetchAirports());
  }, [dispatch]);

  if (loading === 'pending' || loading === 'idle') {
    return <h1>Loading</h1>;
  }

  if (loading === 'rejected') {
    return <h1>Something went wrong</h1>;
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
