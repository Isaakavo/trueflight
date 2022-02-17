import { useSelector } from 'react-redux';
import { getBoking } from '../features/bookingReducer';

import '../styles/cartDetail.css';

const CartDetail = () => {
  const {booking} = useSelector(getBoking);
  console.log({ booking });
  return (
    <div className='cart-detail-container'>
      <ul>
        {booking.map((x) => {
          return (
            <li className='cart-item'>
              <p>Flight origin: {x.origin}</p>
              <p>Flight arrival: {x.destination}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CartDetail;
