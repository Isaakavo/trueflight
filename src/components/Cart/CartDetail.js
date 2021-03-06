import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../common/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import '../../styles/cartDetail.css';

import { getBooking } from '../../selectors';
import { formatDate } from '../../reducers/helpers';

const CartDetail = ({ setShowCart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const booking = useSelector(getBooking);

  const handlePay = () => {
    setShowCart(false);
    navigate('/finish-purchase');
  };

  const handleDelete = ({ target }) => {
    dispatch({ type: 'booking/delete', payload: target.id });
  };

  return (
    <div className='cart-detail-container'>
      {booking.length ? (
        <>
          <ul>
            {booking.map((x, i) => {
              return (
                <li className='cart-item' key={x.id + x.dates.departure}>
                  <h4>Flight {i + 1}</h4>
                  <div className='cart-flight'>
                    <p>Origin: {x.origin.name}</p>
                    <p>Arrival: {x.destination.name}</p>
                    <p>Departure: {formatDate(x.dates.departure)}</p>
                  </div>
                  <div className='cart-price'>
                    <p>Passagers: {x.passagers.number}</p>
                    <p>Price: ${x.total}</p>
                  </div>
                  <span name={x.id} onClick={handleDelete}>
                    <DeleteIcon
                      id={x.id + x.dates.departure}
                      fontSize='medium'
                      onClick={handleDelete}
                    />
                  </span>
                </li>
              );
            })}
          </ul>
          <Button
            extraClass='small-button'
            handler={handlePay}
            label='Go to pay'
          />
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
