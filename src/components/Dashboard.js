import { useState, useEffect } from 'react';
import { fetchDates, fetchAirports } from '../store/reducer';
import { useDispatch, useSelector } from 'react-redux';

import '../styles/dashboard.css';

const selectDates = (state) => {
  const { dates } = state;
  return dates;
};
const availableAirports = (state) => {
  const {
    airports: { reducer },
  } = state;

  if (reducer.selected) {
    const filtered = reducer.airports.filter(
      (x) => x.code !== reducer.selected
    );
    return filtered;
  }

  return reducer;
};

const airportsStatus = (state) => state.airports.fetchStatus;

const Dashboard = () => {
  const [inputs, setInputs] = useState({ origin: '', destination: '' });
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
  const airports = useSelector(availableAirports);
  const airportsStatusSelector = useSelector(airportsStatus);

  const handleSelectedAirport = ({ target }) => {
    if (inputs.origin === '') {
      setInputs({ ...inputs, origin: target.id });
    } else if (inputs.destination === '') {
      setInputs({ ...inputs, destination: target.id });
      setHide(true);
      setDisabled({ ...disabled, dates: false });
    }
    dispatch({
      type: 'airports/selected',
      payload: { airports, selected: target.id },
    });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const handleHide = (e) => {
    if (e.target.id === 'origin') {
      setHide(!hide);
    } else if (e.target.id === 'destination' && inputs.origin === '') {
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
    const obj = { ...inputs, dates, passagers };
    dispatch({ type: 'booking/set', payload: obj });
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

  console.log({ hide });

  return (
    <div className='wrapper'>
      <div className='inputs-container'>
        <div className='airports-container'>
          <input
            id='origin'
            className='inputs'
            type='text'
            placeholder='Origin'
            value={inputs.origin}
            onChange={handleChange}
            onClick={handleHide}
            autoComplete='off'
          />
          <input
            id='destination'
            className='inputs'
            type='text'
            placeholder='Destination'
            value={inputs.destination}
            onChange={handleChange}
            onClick={handleHide}
            autoComplete='off'
          />
        </div>
        {!hide ? (
          <div className='airports-list'>
            <ul>
              {airports.map((x, i) => {
                return (
                  <li id={x.code} key={i} onClick={handleSelectedAirport}>
                    <p
                      id={x.code}
                      onClick={handleSelectedAirport}
                      className='airports-name'
                    >
                      {x.name}
                    </p>{' '}
                    <p
                      id={x.code}
                      onClick={handleSelectedAirport}
                      className='airports-code'
                    >
                      {x.code}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
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
