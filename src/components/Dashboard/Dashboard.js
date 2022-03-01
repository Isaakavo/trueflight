import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Loading from '../common/Loading';
import Wrapper from '../common/Wrapper';
import Button from '../common/Button';
import ErrorScreen from '../common/ErrorScreen';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CancelIcon from '@mui/icons-material/Cancel';

import { fetchDates, fetchAirports } from '../../actions/apiActions';
import { getUi } from '../../selectors';
import '../../styles/dashboard.css';

const inputsDefault = {
  origin: { code: '' },
  destination: { code: '' },
  departure: '',
  passengers: { number: '' },
};

const Dashboard = () => {
  const [inputs, setInputs] = useState(inputsDefault);
  const [hideList, setHideList] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const listRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { airport, dates } = useSelector(({ data }) => data.airports);
  const { loading } = useSelector(getUi);

  const handleChange = ({ target }) => {
    const value = target.value.toUpperCase();

    if (
      inputs.departure &&
      inputs.destination.code &&
      inputs.origin.code &&
      inputs.passengers.number
    ) {
      setDisabled(false);
    }

    switch (target.name) {
      case 'departure':
        setInputs({
          ...inputs,
          [target.name]: target.value,
        });
        break;
      case 'passengers':
        verifyPassengersNumber(value);
        break;

      default:
        break;
    }
  };

  const handleCancelButton = () => {
    if (!hideList) {
      setHideList(true);
    }
    setInputs(inputsDefault);
  };

  const handleHide = ({ target }) => {
    if (target.id === 'destination' && inputs.origin.code !== '') {
      return;
    }
    if (inputs.origin.code !== '' && inputs.destination.code !== '') {
      setInputs(inputsDefault);
    }
    setHideList(!hideList);
  };

  const handleSelectedAirport = ({ target }) => {
    const name = target.getAttribute('name');
    if (inputs.origin.code === '') {
      setInputs({ ...inputs, origin: { code: target.id, name: name } });
    } else if (inputs.destination.code === '') {
      setInputs({ ...inputs, destination: { code: target.id, name: name } });
      setHideList(true);
    }
  };

  const handleButtons = ({ target }) => {
    const { number } = inputs.passengers;

    if (target.id === 'increase') {
      const value = Number(number + 1);
      verifyPassengersNumber(value);
    } else if (target.id === 'decrease' && number >= 1) {
      const value = Number(number - 1);
      verifyPassengersNumber(value);
    }
    if (number === 0) {
      setInputs({ ...inputs, passengers: { number: '' } });
    }
  };

  const verifyPassengersNumber = (value) => {
    if (value < 0) {
      setInputs({ ...inputs, passengers: { number: 1 } });
      return;
    }
    if (value > 10) {
      setInputs({ ...inputs, passengers: { number: 10 } });
      return;
    }
    setInputs({ ...inputs, passengers: { number: value } });
  };

  const handleSubmit = () => {
    if (inputs.departure && inputs.destination && inputs.origin) {
      const newObj = {
        ...inputs,
        route: inputs.origin.code + '-' + inputs.destination.code,
      };
      dispatch({
        type: 'booking/inputs',
        payload: newObj,
      });
      navigate('/book');
    }
  };

  const renderAirportList = () => {
    const filteredList = airport.filter(
      (x) =>
        x.code !== inputs.origin.code &&
        x.code !== inputs.destination.code &&
        x.name.toUpperCase() !== inputs.origin.code &&
        x.name.toUpperCase() !== inputs.destination.code
    );
    return filteredList.map((x, i) => {
      return (
        <li id={x.code} name={x.name} key={i} onClick={handleSelectedAirport}>
          <p
            id={x.code}
            name={x.name}
            onClick={handleSelectedAirport}
            className='airports-name'
          >
            {x.name}
          </p>{' '}
          <p
            id={x.code}
            name={x.name}
            onClick={handleSelectedAirport}
            className='airports-code'
          >
            {x.code}
          </p>
        </li>
      );
    });
  };

  useEffect(() => {
    if (
      loading !== 'succeed' &&
      loading !== 'rejected' &&
      loading !== 'pending' &&
      !airport.length &&
      !airport.dates
    ) {
      dispatch(fetchDates());
      dispatch(fetchAirports());
    }
  }, [dispatch, loading, airport]);

  useEffect(() => {
    if (inputs.departure && inputs.destination && inputs.origin) {
      setDisabled(false);
    }
  }, [inputs.departure, inputs.destination, inputs.origin]);

  useEffect(() => {
    if (!hideList) {
      listRef.current.focus();
    }
  }, [hideList]);

  if ((loading === 'pending' || loading === 'idle') && !airport.length) {
    return <Loading />;
  }

  if (loading === 'rejected') {
    return (
      <ErrorScreen>
        <h1>Something went wrong 🥺 </h1>
        <h4>We sorry</h4>
      </ErrorScreen>
    );
  }

  return (
    <Wrapper className='wrapper'>
      <div className='inputs-container'>
        <div className='airports-container'>
          <input
            id='origin'
            name='origin'
            className='inputs inputs-read-only'
            type='text'
            placeholder='Origin'
            value={inputs.origin.code}
            onClick={handleHide}
            readOnly
            autoComplete='off'
          />
          <input
            id='destination'
            name='destination'
            className='inputs inputs-read-only'
            type='text'
            placeholder='Destination'
            value={inputs.destination.code}
            onClick={handleHide}
            readOnly
            autoComplete='off'
          />
          <span>
            <CancelIcon onClick={handleCancelButton} fontSize='medium' />
          </span>
        </div>
        {hideList ? (
          <>
            <div className='airports-container'>
              <input
                className='inputs inputs-disabled'
                type='date'
                name='departure'
                id='departure'
                value={inputs.departure}
                onChange={handleChange}
                placeholder='Departure Date'
                min={dates.minDate.date}
                max={dates.maxDate?.date}
              />
            </div>
            <div className='airports-container ' onChange={handleChange}>
              <input
                className='inputs inputs-disabled'
                type='number'
                name='passengers'
                id='passengers'
                placeholder='Passengers (max 10)'
                value={inputs.passengers.number}
                onChange={handleChange}
              />
              <span>
                <ArrowDropUpIcon
                  id='increase'
                  name='increase'
                  onClick={handleButtons}
                />
              </span>
              <span>
                <ArrowDropDownIcon id='decrease' onClick={handleButtons} />
              </span>
            </div>
            <Button handler={handleSubmit} disabled={disabled} label='Submit' />
          </>
        ) : (
          <div
            tabIndex={0}
            ref={listRef}
            onBlur={() => setHideList(true)}
            className='airports-list'
          >
            <ul>{renderAirportList()}</ul>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Dashboard;
