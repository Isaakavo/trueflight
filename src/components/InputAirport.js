import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { availableAirports } from '../reducers/airportReducer';

import Input from './Input';
import CancelIcon from '@mui/icons-material/Cancel';

const InputAirport = () => {
  const [inputs, setInputs] = useState({
    origin: { code: '' },
    destination: { code: '' },
  });
  const { airport, input, hideList } = useSelector(availableAirports);
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    const value = target.value.toUpperCase();
    setInputs({ ...inputs, [target.name]: { code: value } });
    dispatch({
      type: 'airports/selected',
      payload: { ...airport, selected: value.toUpperCase() },
    });
    dispatch({
      type: 'airports/inputs',
      payload: {
        ...inputs,
        [target.name]: { code: value },
      },
    });
  };

  const handleHide = ({ target }) => {
    if (target.id === 'destination' && inputs.origin.code !== '') {
      return;
    }
    dispatchhideList(!hideList);
  };

  const handleCancelButton = () => {
    dispatch({ type: 'airports/resetselected' });
    if (!hideList) {
      dispatchhideList(true)
    }
  };

  const dispatchhideList = (value) => {
    dispatch({
      type: 'airports/hidelist',
      payload: { hideList: value },
    });
  };

  useEffect(() => {
    setInputs(input);
  }, [input]);

  return (
    <div className='airports-container'>
      <Input
        id='origin'
        name='origin'
        className='inputs'
        type='text'
        placeholder='Origin'
        value={inputs.origin.code}
        onChange={handleChange}
        onClick={handleHide}
      />
      <Input
        id='destination'
        name='destination'
        className='inputs'
        type='text'
        placeholder='Destination'
        value={inputs.destination.code}
        onChange={handleChange}
        onClick={handleHide}
      />
      <span>
        <CancelIcon onClick={handleCancelButton} fontSize='medium' />
      </span>
    </div>
  );
};

export default InputAirport;
