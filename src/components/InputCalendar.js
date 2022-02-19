import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import Input from './Input';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

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
    if (target.name === 'departure') {
      setDates({
        ...dates,
        [target.name]: target.value,
        minDate: target.value,
      });
      // return;
      dispatch({
        type: 'dates/selectdate',
        payload: { ...dates, [target.name]: target.value },
      });
    }
    setDates({ ...dates, [target.name]: target.value, maxDate: target.value });
    dispatch({
      type: 'dates/selectdate',
      payload: { ...dates, [target.name]: target.value },
    });
  };

  return (
    <div className='airports-container' hidden={hide}>
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
      {/* <Input
        className='inputs inputs-disabled'
        type='date'
        name='comeback'
        id='comeback'
        // disabled={disabled.dates}
        max={maxDate?.date}
        min={dates?.minDate}
        onChange={handleSelectDate}
      /> */}
    </div>
  );
};

export default InputCalendar;
