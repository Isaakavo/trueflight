import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from './Input';

import { selectDates } from '../features/airportReducer';

const InputCalendar = ({ hide }) => {
  const dispatch = useDispatch();
  const [dates, setDates] = useState({
    departure: '',
    comeback: '',
    minDate: '',
    maxDate: '',
  });

  const { minDate, maxDate } = useSelector(selectDates);

  const handleSelectDate = ({ target }) => {
    setDates((state) => ({
      ...state,
      [target.name]: target.value,
    }));

    if (target.name === 'departure') {
      setDates({ ...dates, minDate: target.value });
    }

    dispatch({
      type: 'dates/selectdate',
      payload: { ...dates, [target.name]: target.value },
    });
  };

  // useEffect(() => {

  // }, [dates])

  return (
    <div className='airports-container' hidden={!hide}>
      <Input
        className='inputs inputs-disabled'
        type='date'
        name='departure'
        id='departure'
        onChange={handleSelectDate}
        min={minDate?.date}
        max={maxDate?.date}
        // disabled={disabled.dates}
      />
      <Input
        className='inputs inputs-disabled'
        type='date'
        name='comeback'
        id='comeback'
        // disabled={disabled.dates}
        max={maxDate?.date}
        min={dates?.minDate}
        onChange={handleSelectDate}
      />
    </div>
  );
};

export default InputCalendar;
