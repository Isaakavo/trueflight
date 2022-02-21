import moment from 'moment';

const FlightsList = ({ handleSelectedFlight, flights }) => {
  moment.locale('en');
  return (
    <>
      {flights.journeys.map((x) => {
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
      })}
    </>
  );
};

export default FlightsList;
