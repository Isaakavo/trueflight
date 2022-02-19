import { useSelector } from 'react-redux';

const FinishModal = ({ inputs }) => {
  const booking = useSelector(({ booking }) => booking);
  console.log(booking);
  return (
    <div className='modal-container'>
      <h2>This tickets are yours!</h2>
      <h4>Your purchase: </h4>
      <section className='modal-section'>
        <div>
          <b>Name: </b>{' '}
          <p>
            {inputs.firstname + ' ' + inputs.lastname + ' ' + inputs.surname}
          </p>
        </div>
        <div>
          <b>Direction: </b>
          <p>{inputs.direction}</p>
        </div>
        <div>
          <b>email:</b>
          <p>{inputs.email}</p>
        </div>
      </section>
      <section>
        <h4>Flight information: </h4>
        <div>
          {booking.map((x, i) => {
            return (
              <div className='flight-container' key={i}>
                <div>
                  <b>Origin</b>{' '}
                  <p>
                    {x.origin.name} {x.origin.code}
                  </p>
                  <b>Destination</b>{' '}
                  <p>
                    {x.destination.name} {x.destination.code}
                  </p>
                </div>
                <div>
                  <b>Departure</b> <p>{x.departure}</p>
                  {/* <b>Comeback</b> <p>{x.comeback}</p> */}
                </div>
                <div>
                  <b>Passagers</b> <p>{x.passagers.number}</p>
                  <b>Total</b>{' '}
                  <p>
                    ${Math.round(x.passagers.number * x.amount * 100) / 100}
                  </p>
                </div>
              </div>
            );
          })}
          <div className='flight-container'>
            <p className='total-column'>
              Total: $
              {booking.reduce(
                (acc, val) =>
                  Math.round((acc + val.amount * val.passagers.number) * 100) /
                  100,
                0
              )}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinishModal;