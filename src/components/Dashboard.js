import { useState, useEffect } from 'react';
import { fetchDates, fetchAirports } from '../features/reducer';
import { useDispatch, useSelector } from 'react-redux';

import InputAirport from './InputAirport';
import AirportList from './AirportsList';

import { availableAirports } from '../features/airportReducer';

import '../styles/dashboard.css';

const selectDates = (state) => {
  const { dates } = state;
  return dates;
};

const airportsStatus = (state) => state.airports.fetchStatus;

const Dashboard = () => {
  // const [inputs, setInputs] = useState({ origin: '', destination: '' });
  const [dates, setDates] = useState({
    departure: '',
    comeback: '',
    minDate: '',
    maxDate: '',
  });
  const [passagers, setPassagers] = useState({ number: 1 });
  const [hide, setHide] = useState(true);
  const [disabled, setDisabled] = useState({ dates: true, passagers: true });
  const dispatch = useDispatch();
  const flyDates = useSelector(selectDates);
  const { input } = useSelector(availableAirports);
  const airportsStatusSelector = useSelector(airportsStatus);

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const handleHide = (e) => {
    if (e.target.id === 'origin') {
      setHide(!hide);
    } else if (e.target.id === 'destination' && input.origin === '') {
      setHide(!hide);
    }
  };

  const handleSelectDate = ({ target }) => {
    setDates((state) => ({
      ...state,
      [target.name]: target.value,
    }));
    setDisabled({ ...disabled, passagers: false });
  };

  const handlePassagersNumber = ({ target }) => {
    setPassagers({ ...passagers, number: target.value });
  };

  const handleSubmit = () => {
    // const obj = { ...inputs, dates, passagers };
    // dispatch({ type: 'booking/set', payload: obj });
  };

  useEffect(() => {
    dispatch(fetchDates());
    dispatch(fetchAirports());
  }, []);

  if (
    airportsStatusSelector.loading === 'pending' ||
    airportsStatusSelector.loading === 'idle'
  ) {
    return <h1>Loading</h1>;
  }

  return (
    <div className='wrapper'>
      <div className='inputs-container'>
        <InputAirport
          setHide={setHide}
          disabled={disabled}
          setDisabled={setDisabled}
          handleHide={handleHide}
          handleChange={handleChange}
        />
        {!hide ? <AirportList /> : null}
        <div className='airports-container' hidden={!hide}>
          <input
            className='inputs inputs-disabled'
            type='date'
            name='departure'
            id='departure'
            onChange={handleSelectDate}
            min='2022-02-16'
            disabled={disabled.dates}
          />
          <input
            className='inputs inputs-disabled'
            type='date'
            name='comeback'
            id='comeback'
            disabled={disabled.dates}
            onChange={handleSelectDate}
          />
        </div>
        <div
          className='airports-container '
          hidden={!hide}
          onChange={handlePassagersNumber}
          disabled={disabled.passagers}
        >
          <input
            className='inputs inputs-disabled'
            type='number'
            name='passagers'
            id='passagers'
            placeholder='Passagers'
            value={passagers.number}
            onChange={handlePassagersNumber}
            disabled={disabled.passagers}
          />
        </div>
        <button className='search-button' hidden={!hide} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
