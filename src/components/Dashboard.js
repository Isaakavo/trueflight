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
  // const [passagers, setPassagers] = useState({ number: 1 });
  const [hide, setHide] = useState(true);
  const [disabled, setDisabled] = useState({ dates: true, passagers: true });
  const dispatch = useDispatch();

  const { input, hideR } = useSelector(availableAirports);
  const dates = useSelector(selectDates);
  const { loading } = useSelector(airportsStatus);

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  // const handlePassagersNumber = ({ target }) => {
  //   setPassagers({ ...passagers, number: target.value });
  // };

  const handleSubmit = () => {
    const obj = { ...input, dates };
    console.log({ obj });
    dispatch({ type: 'booking/set', payload: obj });
  };

  useEffect(() => {
    dispatch(fetchDates());
    dispatch(fetchAirports());
  }, [dispatch]);

  if (loading === 'pending' || loading === 'idle') {
    return <h1>Loading</h1>;
  }

  console.log({ hideR });
  return (
    <div className='wrapper'>
      <div className='inputs-container'>
        <InputAirport handleChange={handleChange} />
        {!hideR ? <AirportList /> : null}
        <InputCalendar hide={hideR} />
        <InputPassagers />
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
