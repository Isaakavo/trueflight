import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBooking } from '../features/bookingReducer';

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

  const handleDelete = ({ target }) => {
    debugger;
    console.log(target.id);
    dispatch({ type: 'booking/delete', payload: target.id });
  };

  debugger;
  console.log(booking);

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
                    <p>Price: ${x.passagers.number * x.amount}</p>
                  </div>
                  <DeleteIcon
                    id={x.id}
                    fontSize='small'
                    onClick={handleDelete}
                  />
                </li>
              );
            })}
          </ul>
          <button className='pay-button' onClick={handlePay}>
            Go to pay
          </button>
        </>
      ) : (
        <h1>Nothing here!</h1>
      )}
    </div>
  );
};

export default CartDetail;
