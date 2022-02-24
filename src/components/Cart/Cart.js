import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import CartDetail from './CartDetail';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import { getBooking } from '../../selectors'

const Cart = () => {
  const [showCart, setShowCart] = useState(false);
  const booking = useSelector(getBooking);
  const numberOfItems = booking.length;
  const handleShowCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className='shopping-cart'>
      {numberOfItems > 0 ? (
        <span className='bubble'>
          <span className='bubble-alert' style={{color: '#fff', fontSize: '0.9rem'}}>
            {numberOfItems < 10 ? numberOfItems : '9+'}
          </span>
        </span>
      ) : null}
      <ShoppingBagIcon fontSize='large' onClick={handleShowCart} />
      {showCart ? <CartDetail setShowCart={setShowCart} /> : null}
    </div>
  );
};

export default Cart;
