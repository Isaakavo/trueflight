import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FlightsList from './FlightsList';
import Wrapper from './Wrapper';
import Loading from './Loading';

import { fetchFlights } from '../features/reducer';
import { availableAirports } from '../features/airportReducer';
import { selectDates } from '../features/airportReducer';

import '../styles/selectFlights.css';

const SelectFlight = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { input, passagers, route } = useSelector(availableAirports);
  const dates = useSelector(selectDates);
  const flights = useSelector(
    ({ flights: { flightReducer } }) => flightReducer
  );
  const { loading } = useSelector(
    ({ flights: { fetchingFlightsReducer } }) => fetchingFlightsReducer
  );
  const handleSelectedFlight = ({ target }) => {
    const { id } = target;
    const [selectedFlight] = flights.journeys.filter((x) => x.key === id);
    const amount = selectedFlight.fare.amount;
    const total = (amount * passagers.number * 100) / 100;
    const newState = {
      id: id,
      amount: amount,
      cartFlag: true,
      route: route,
      total,
      passagers: passagers,
      ...input,
      ...dates,
    };
    dispatch({
      type: 'booking/set',
      payload: newState,
    });

    dispatch({
      type: 'airports/resetselected',
    });
    dispatch({ type: 'dates/reset' });
    navigate('/trueflight');
  };

  useEffect(() => {
    dispatch(fetchFlights(route));
  }, [dispatch, route]);

  if (Object.keys(flights).length === 0 || loading === 'pending') {
    return <Loading />;
  } else if (loading === 'rejected') {
    return <h1>Something went wrong in our side 🥺</h1>;
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
          <div className='flights-data-container'>
            {
              <FlightsList
                flights={flights}
                handleSelectedFlight={handleSelectedFlight}
              />
            }
          </div>
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default SelectFlight;
