import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getFinalBooking } from '../features/bookingReducer';

import '../styles/cartDetail.css';

const CartDetail = ({setShowCart}) => {
  const navigate = useNavigate();
  const { booking } = useSelector(getFinalBooking);
  debugger;
  console.log({ booking });

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
              <p>Price: ${x.amount}</p>
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
