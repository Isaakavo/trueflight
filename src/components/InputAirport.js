import { useState } from 'react';
import { useSelector } from 'react-redux';
import Input from './Input';

import { availableAirports } from '../features/airportReducer';

const InputAirport = ({  handleHide, handleChange }) => {
  const {input} = useSelector(availableAirports);

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
