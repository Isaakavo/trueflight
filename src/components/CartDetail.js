import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBooking } from '../reducers/bookingReducer';

import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/cartDetail.css';

const CartDetail = ({ setShowCart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { booking } = useSelector(getBooking);

  const handlePay = () => {
    setShowCart(false);
    navigate('/finish-purchase');
  };

  const handleDelete = ({target}) => {
    dispatch({ type: 'booking/delete', payload: target.id });
  };

  return (
    <div className='cart-detail-container'>
      {booking.length ? (
        <>
          <ul>
            {booking.map((x, i) => {
              return (
                <li className='cart-item' key={i}>
                  <h4>Flight {i + 1}</h4>
                  <div className='cart-flight'>
                    <p>Origin: {x.origin.name}</p>
                    <p>Arrival: {x.destination.name}</p>
                  </div>
                  <div className='cart-price'>
                    <p>Passagers: {x.passagers.number}</p>
                    <p>Price: ${x.total}</p>
                  </div>
                  <span name={x.id} onClick={handleDelete}>
                  <DeleteIcon
                    id={x.id}
                    fontSize='medium'
                    onClick={handleDelete}
                  />
                  </span>
                </li>
              );
            })}
          </ul>
          <button className='pay-button' onClick={handlePay}>
            Go to pay
          </button>
        </>
      ) : (
        <div className='nothing-here'>
          <h3>Opss...! Nothing in here!</h3>
          <p>Select a flight to add it to your cart!</p>
        </div>
      )}
    </div>
  );
};

export default CartDetail;
