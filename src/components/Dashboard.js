import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import InputAirport from './InputAirport';
import AirportList from './AirportsList';
import InputCalendar from './InputCalendar';
import InputPassagers from './InputPassagers';
import Loading from './Loading';
import Wrapper from './Wrapper';

import { fetchDates, fetchAirports } from '../actions/dataActions';
import { availableAirports, selectDates } from '../reducers/helperFunctions';
import '../styles/dashboard.css';

const airportsStatus = ({ ui }) => ui.loading;

const Dashboard = () => {
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { input, hideList } = useSelector(availableAirports);
  const dates = useSelector(selectDates);
  const { loading } = useSelector(airportsStatus);

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
        {!hideList ? <AirportList /> : null}
        {hideList ? <InputCalendar /> : null}
        {hideList ? <InputPassagers /> : null}
        <button
          className='search-button'
          hidden={!hideList}
          onClick={handleSubmit}
          disabled={disabled}
        >
          Submit
        </button>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
