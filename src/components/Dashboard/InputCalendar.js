import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import Input from '../common/Input';

import { selectDates } from '../../reducers/helperFunctions';

const InputCalendar = ({ hide }) => {
  const dispatch = useDispatch();
  const [dates, setDates] = useState({
    departure: '',
    comeback: '',
    minDate: '',
    maxDate: '',
  });

  const { minDate, maxDate } = useSelector(selectDates);
  const getActualMinDate = moment(minDate.date).isBefore(moment().toISOString(), 'day') ? moment().format('YYYY-MM-DD') : minDate.date;

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
        payload: { [target.name]: target.value },
      });
    }
    setDates({ ...dates, [target.name]: target.value, maxDate: target.value });
    dispatch({
      type: 'dates/selectdate',
      payload: { [target.name]: target.value },
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
        placeholder='Departure Date'
        min={getActualMinDate}
        max={maxDate?.date}
      />
    </div>
  );
};

export default InputCalendar;
