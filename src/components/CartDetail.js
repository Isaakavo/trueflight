import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getBooking } from '../features/bookingReducer';

import '../styles/cartDetail.css';

const CartDetail = ({setShowCart}) => {
  const navigate = useNavigate();
  const { booking } = useSelector(getBooking);

  const handlePay = () => {
    setShowCart(false);
    navigate('/finish-purchase');
  };

  return (
    <div className='cart-detail-container'>
      <ul>
        {booking.map((x) => {
          return (
            <li className='cart-item'>
              <p>Flight origin: {x.origin.name}</p>
              <p>Flight arrival: {x.destination.name}</p>
              <p>Number of passagers: {x.passagers.number}</p>
              <p>Price: ${x.passagers.number * x.amount}</p>
            </li>
          );
        })}
      </ul>
      <button className='pay-button' onClick={handlePay}>
        Go to pay
      </button>
    </div>
  );
};

export default CartDetail;
