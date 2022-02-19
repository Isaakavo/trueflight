import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import Wrapper from './Wrapper';
import Loading from './Loading';

import { fetchFlights } from '../features/reducer';
import { getFlights } from '../features/flightReducer';
import { availableAirports } from '../features/airportReducer';
import { selectDates } from '../features/airportReducer';

import '../styles/selectFlights.css';

const SelectFlight = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const payload  = useSelector(getFlights);
  const { input, passagers, route } = useSelector(availableAirports);
  const dates = useSelector(selectDates);
  const { loading } = useSelector(
    ({ flights: { fetchingFlightsReducer } }) => fetchingFlightsReducer
  );

  const handleSelectedFlight = ({ target }) => {
    const { id } = target;
    const [selectedFlight] = payload.journeys.filter(
      (x) => x.key === id
    );
    const amount = selectedFlight.fare.amount;
    const newState = {
      id: id,
      amount: amount,
      cartFlag: true,
      route: route,
      passagers: passagers,
      ...input,
      ...dates,
    };
    dispatch({
      type: 'booking/set',
      payload: newState,
    });

    dispatch({
      type: 'airports/reset',
    });
    navigate('/trueflight');
  };

  //TODO create a component

  const getFlightsByDate = () => {
    debugger;
    if (!payload) {
      return null;
    }

    if (loading === 'rejected') {
      return <h1>Something went wrong</h1>;
    }
    moment.locale('en');

    debugger;
    const flights = payload;
    if (Object.keys(flights).length === 0) {
      dispatch({ type: 'flights/error' });
      return;
    }

    return flights.journeys.map((x) => {
      return (
        <div
          key={x.key}
          className='flights-list'
          style={x.isSoldout ? { pointerEvents: 'none', opacity: '0.4' } : {}}
        >
          <li>
            <div className='flights-departure-container'>
              <p>{moment(x.departureDate).format('H:m')} hrs</p>
              <p>{x.origin.code}</p>
            </div>
            <div className='flights-departure-container'>
              <p> {moment(x.arrivalDate).format('H:m')} hrs</p>
              <p> {x.destination.code}</p>
            </div>
            <div className='flights-departure-container'>
              <p>Duration </p>
              <p>{x.journeyDuration} hrs</p>
            </div>
            <div
              id={x.key}
              className='flights-departure-price'
              onClick={handleSelectedFlight}
            >
              <div id={x.key} className='flights-departure-container '>
                <p id={x.key}>Price</p>
                <p id={x.key}>${x.fare.amount}</p>
              </div>
            </div>
          </li>
        </div>
      );
    });
  };

  useEffect(() => {
    debugger;
    dispatch(fetchFlights(route));
  }, [dispatch, route]);

  if (loading === 'rejected') {
    return <h1>Something went wrong :(</h1>;
  }
  return (
    <>
      {loading !== 'pending' ? (
        <Wrapper>
          <div className='flights-container'>
            <div className='flights-data'>
              <p>Origin: {input.origin.name}</p>
              <p>Destination: {input.destination.name}</p>
              <p>Departure: {dates.departure}</p>
              <p>Comeback: {dates.comeback}</p>
              <p>Number of passagers: {passagers.number}</p>
            </div>
          </div>
          <div className='flights-data-container'>{getFlightsByDate()}</div>
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default SelectFlight;