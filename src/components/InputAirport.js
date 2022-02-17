import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from './Input';

import { availableAirports } from '../features/airportReducer';

const InputAirport = () => {
  const { input, hideR, airportData } = useSelector(availableAirports);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const handleHide = (e) => {
    if (e.target.id === 'origin') {
      const value = !hideR;
      dispatch({
        type: 'airports/hidelist',
        payload: { hideR: value },
      });
    } else if (e.target.id === 'destination' && input.origin !== '') {
      const value = !hideR;
      dispatch({
        type: 'airports/hidelist',
        payload: { hideR: value },
      });
    }
  };
  return (
    <div className='airports-container'>
      <Input
        id='origin'
        className='inputs'
        type='text'
        placeholder='Origin'
        value={input?.origin?.code}
        onChange={handleChange}
        onClick={handleHide}
      />
      <Input
        id='destination'
        className='inputs'
        type='text'
        placeholder='Destination'
        value={input?.destination?.code}
        onChange={handleChange}
        onClick={handleHide}
      />
    </div>
  );
};

export default InputAirport;
