import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import Wrapper from '../common/Wrapper';
import Loading from '../common/Loading';
import ErrorScreen from '../common/ErrorScreen';

import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';

import { fetchFlights } from '../../actions/apiActions';
import { getFlights, getUi } from '../../selectors';
import { formatDate } from '../../reducers/helpers';

import '../../styles/selectFlights.css';

const SelectFlight = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { input, passengers, route } = useSelector(getAvailableAirports);
  const { inputs } = useSelector((state) => state.data);
  // const { dates } = useSelector((state) => data.airport);
  const flights = useSelector(getFlights);
  const {loading} = useSelector(getUi);

  const handleSelectedFlight = ({ target }) => {
    const { id } = target;
    const [selectedFlight] = flights.journeys.filter((x) => x.key === id);
    const amount = selectedFlight.fare.amount;
    const total = (amount * inputs.passengers.number * 100) / 100;
    const reservations = {
      id: id + inputs.departure,
      amount: amount,
      cartFlag: true,
      route: inputs.route,
      total,
      dates: { departure: inputs.departure },
      passagers: inputs.passengers,
      showReservationModal: true,
      ...inputs,
    };
    dispatch({
      type: 'booking/set',
      payload: reservations,
    });
    navigate('/trueflight');
  };

  useEffect(() => {
    if (inputs.route) {
      dispatch(fetchFlights(inputs.route));
    }
  }, [dispatch, inputs.route]);

  if (loading === 'pending' || loading === 'idle') {
    return <Loading />;
  }

  if (loading === 'rejected') {
    return (
      <ErrorScreen>
        <h1>Sorry, we dont have flights for this route 😢</h1>
      </ErrorScreen>
    );
  }
  if (Object.keys(flights).length === 0 || loading === 'pending') {
    return <Loading />;
  }

  return (
    <Wrapper>
      <section className='flights-data'>
        <div className='flights-data-div'>
          <p>Origin: {inputs.origin.name}</p>
        </div>
        <div className='flights-data-div'>
          <p>Destination: {inputs.destination.name}</p>
        </div>
        <div className='flights-data-div'>
          <p>Departure: {formatDate(inputs.departure)}</p>
        </div>
        <div>
          <p>Number of passengers: {inputs.passengers.number}</p>
        </div>
      </section>
      <section className='flights-data-container'>
        {flights.journeys.map((x) => {
          return (
            <div
              key={x.key}
              className='flights-list'
              style={
                x.isSoldout ? { pointerEvents: 'none', opacity: '0.4' } : {}
              }
            >
              <li>
                <div className='flights-departure-container'>
                  <p>{moment(x.departureDate).format('H:m')} hrs</p>
                  <p>{x.origin.code}</p>
                </div>
                <div className='flights-departure-container'>
                  <FlightTakeoffIcon />
                </div>
                <div className='flights-departure-container'>
                  <p> {moment(x.arrivalDate).format('H:m')} hrs</p>
                  <p> {x.destination.code}</p>
                </div>
                <div className='flights-departure-container'>
                  <FlightLandIcon />
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
        })}
      </section>
    </Wrapper>
  );
};

export default SelectFlight;
