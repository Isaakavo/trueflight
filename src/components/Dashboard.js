import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Loading from './Loading';
import Wrapper from './Wrapper';
import InputAirport from './InputAirport';
import AirportList from './AirportsList';
import InputCalendar from './InputCalendar';
import InputPassagers from './InputPassagers';
import Button from './Button';

import { fetchDates, fetchAirports } from '../actions/dataActions';
import { availableAirports, selectDates } from '../reducers/helperFunctions';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { input, hideList } = useSelector(availableAirports);
  const dates = useSelector(selectDates);
  const { loading } = useSelector(({ ui }) => ui.loading);

  const handleSubmit = () => {
    if (dates.departure && input.destination && input.origin) {
      navigate('/book');
    }
  };

  useEffect(() => {
    if (loading !== 'succeed' && loading !== 'rejected') {
      dispatch(fetchDates());
      dispatch(fetchAirports());
    }
  }, [dispatch, loading]);

  useEffect(() => {
    if (dates.departure && input.destination && input.origin) {
      setDisabled(false);
    }
  }, [dates.departure, input.destination, input.origin]);

  if (loading === 'pending' || loading === 'idle') {
    return <Loading />;
  }

  if (loading === 'rejected') {
    return <h1>Something went wrong</h1>;
  }

  return (
    <Wrapper className='wrapper'>
      <div className='inputs-container'>
        <InputAirport />
        {hideList ? (
          <>
            <InputCalendar />
            <InputPassagers />
            <Button
              handler={handleSubmit}
              disabled={disabled}
              label='Submit'
            />
          </>
        ) : (
          <AirportList />
        )}
      </div>
    </Wrapper>
  );
};

export default Dashboard;
