import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFlights } from '../features/reducer';
import { getFlights } from '../features/flightReducer';
import { getBookingForFlights } from '../features/bookingReducer';
import { availableAirports } from '../features/airportReducer';
import Input from './Input';

const SelectFlight = () => {
  const dispatch = useDispatch();
  const { payload } = useSelector(getFlights);
  const { airportData, dates, passagers } = useSelector(getBookingForFlights);
  const { input } = useSelector(availableAirports);

  debugger;
  console.log({ dates });

  const getFlightsByDate = () => {
    debugger;
    if (!payload) {
      return null;
    }
    // return payload[0].journeys.map((y) => {
    //   return (
    //     <div>
    //       <p>Arrival Date: {y.arrivalDate}</p>
    //       <p>Departure date: {y.departureDate} </p>
    //       <p>Destination: {y.destination.name}</p>
    //       <p>Origin: {y.origin.name}</p>
    //       <p>Duration: {y.journeyDuration} hrs</p>
    //       {/* {!y.isSoldOut ?  <p>Price: ${y.fares[0].fare.amount}</p> :null} */}
    //     </div>
    //   );
    // });
    return payload.map((x) => {
      return (x.journeys.map((y) => {
        return (
          <div>

            <p>Arrival Date: {y.arrivalDate}</p>
            <p>Departure date: {y.departureDate} </p>
            <p>Destination: {y.destination.name}</p>
            <p>Origin: {y.origin.name}</p>
            <p>Duration: {y.journeyDuration} hrs</p>
            {/* {!y.isSoldOut ?  <p>Price: ${y.fares[0].fare.amount}</p> :null} */}
          </div>
        )
      }))
    })
  };

  useEffect(() => {
    debugger;
    dispatch(fetchFlights());
  }, [dispatch]);
  return (
    <div>
      <div>{getFlightsByDate()}</div>
      <p>Origin: {input.origin.name}</p>
      <p>Destination: {input.destination.name}</p>
      <p>Departure: {dates.departure}</p>
      <p>Comeback: {dates.comeback}</p>
      <p>Number of passagers: {passagers.number}</p>
      <p></p>
    </div>
  );
};

export default SelectFlight;
