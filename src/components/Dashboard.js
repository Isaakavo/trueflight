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
import { availableAirports, selectDates } from '../reducers/airportReducer';
import '../styles/dashboard.css';

const airportsStatus = (state) => state.airports.fetchStatus;

const Dashboard = () => {
  const [disabled, setDisabled] = useState(true)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { input, hideR } = useSelector(availableAirports);
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
  }, [dates.departure, input.destination, input.origin])

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
        {!hideR ? <AirportList /> : null}
        {hideR ? <InputCalendar /> : null}
        {hideR ? <InputPassagers /> : null}
        <button
          className='search-button'
          hidden={!hideR}
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
