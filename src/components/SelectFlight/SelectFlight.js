import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FlightsList from './FlightsList';
import Wrapper from '../common/Wrapper';
import Loading from '../common/Loading';

import { fetchFlights } from '../../actions/dataActions';
import { availableAirports, selectDates } from '../../reducers/helperFunctions';

import '../../styles/selectFlights.css';

const SelectFlight = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { input, passengers, route } = useSelector(availableAirports);
  const dates = useSelector(selectDates);
  const flights = useSelector(({ data }) => data.flights);
  const { loading } = useSelector(({ ui }) => ui);
  const handleSelectedFlight = ({ target }) => {
    const { id } = target;
    const [selectedFlight] = flights.journeys.filter((x) => x.key === id);
    const amount = selectedFlight.fare.amount;
    const total = ((amount * passengers.number) * 100) / 100;
    const newState = {
      id: id,
      amount: amount,
      cartFlag: true,
      route: route,
      total,
      passagers: passengers,
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

  if (loading === 'rejected') {
    return <h1>Something went wrong in our side 🥺</h1>;
  }
  if (Object.keys(flights).length === 0 || loading === 'pending') {
    return <Loading />;
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
              <p>Number of passengers: {passengers.number}</p>
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
