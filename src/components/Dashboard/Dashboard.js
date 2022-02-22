import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Loading from '../common/Loading';
import Wrapper from '../common/Wrapper';
import InputAirport from './InputAirport';
import AirportList from './AirportsList';
import InputCalendar from './InputCalendar';
import InputPassagers from './InputPassagers';
import Button from '../common/Button';

import { fetchDates, fetchAirports } from '../../actions/dataActions';
import { getAvailableAirports, getDates, getUi } from '../../selectors';
import '../../styles/dashboard.css';

const Dashboard = () => {
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { input, hideList } = useSelector(getAvailableAirports);
  const { departure } = useSelector(getDates);
  const { loading } = useSelector(getUi);

  const handleSubmit = () => {
    if (departure && input.destination && input.origin) {
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
    if (departure && input.destination && input.origin) {
      setDisabled(false);
    }
  }, [departure, input.destination, input.origin]);

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
            <Button handler={handleSubmit} disabled={disabled} label='Submit' />
          </>
        ) : (
          <AirportList />
        )}
      </div>
    </Wrapper>
  );
};

export default Dashboard;
