import { useSelector } from 'react-redux';
import { getFinalBooking } from '../features/bookingReducer';

import '../styles/cartDetail.css';

const CartDetail = () => {
  const { booking } = useSelector(getFinalBooking);
  debugger;
  console.log({ booking });
  return (
    <div className='cart-detail-container'>
      <ul>
        {booking.map((x) => {
          return (
            <li className='cart-item'>
              <p>Flight origin: {x.origin.name}</p>
              <p>Flight arrival: {x.destination.name}</p>
              <p>Price: ${x.amount}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CartDetail;
