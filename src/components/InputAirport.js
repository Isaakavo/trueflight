import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from './Input';

import { availableAirports } from '../features/airportReducer';

const InputAirport = ({ handleChange }) => {
  const {input, hideR} = useSelector(availableAirports);
const dispatch = useDispatch();

  const handleHide = (e) => {
    debugger;
    if (e.target.id === 'origin') {
      // setHide(!hide);
      const value = !hideR;
      dispatch({
        type: 'airports/hidelist',
        payload: { hideR: value },
      });
    } else if (e.target.id === 'destination' && input.origin !== '') {
      // setHide(!hide);
      const value = !hideR;
      dispatch({
        type: 'airports/hidelist',
        payload: { hideR: value },
      });
    }
  };

  console.log(input);

  return (
    <div className='airports-container'>
      <Input
        id='origin'
        className='inputs'
        type='text'
        placeholder='Origin'
        value={input?.origin}
        onChange={handleChange}
        onClick={handleHide}
      />
      <Input
        id='destination'
        className='inputs'
        type='text'
        placeholder='Destination'
        value={input?.destination}
        onChange={handleChange}
        onClick={handleHide}
      />
    </div>
  );
};

export default InputAirport;
