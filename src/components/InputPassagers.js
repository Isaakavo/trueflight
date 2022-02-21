import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Input from './Input';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const InputPassagers = ({ hide }) => {
  const [passagers, setPassagers] = useState({ number: '' });
  const dispatch = useDispatch();

  const handleButtons = ({ target }) => {
    const { number } = passagers;

    if (target.id === 'increase') {
      const value = Number(number + 1);
      setPassagers({ number: value });
      dispatchPassasgers(value);
    } else if (target.id === 'decrease' && number >= 1) {
      const value = Number(number - 1);
      setPassagers({ number: value });
      dispatchPassasgers(value);
    }
    if (number === 0) {
      setPassagers({ number: '' });
    }
  };

  const handlePassagersNumber = ({ target }) => {
    const { value } = target;
    if (value < 0) {
      setPassagers({ ...passagers, number: 1 });
      return;
    }
    setPassagers({ ...passagers, number: value });
    dispatchPassasgers(value);
  };

  const dispatchPassasgers = (value) => {
    dispatch({
      type: 'airports/passengers',
      payload: { passengers: { number: value } },
    });
  };

  return (
    <div
      className='airports-container '
      hidden={!hide}
      onChange={handlePassagersNumber}
      // disabled={disabled.passagers}
    >
      <Input
        className='inputs inputs-disabled'
        type='number'
        name='passagers'
        id='passagers'
        placeholder='Passengers'
        value={passagers.number}
        onChange={handlePassagersNumber}
        // disabled={disabled.passagers}
      />
      <span>
        <ArrowDropUpIcon id='increase' onClick={handleButtons} />
      </span>
      <span>
        <ArrowDropDownIcon id='decrease' onClick={handleButtons} />
      </span>
    </div>
  );
};

export default InputPassagers;
