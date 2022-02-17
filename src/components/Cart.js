import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getBookingForFlights } from '../features/bookingReducer';
import CartDetail from './CartDetail';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const Cart = () => {
  const [showCart, setShowCart] = useState(false);
  const {cartFlag}  = useSelector(getBookingForFlights);
  const handleShowCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className='shopping-cart'>
      {cartFlag ? (
        <span className='bubble'>
          <span className='bubble-alert'></span>
        </span>
      ) : null}
      <ShoppingBagIcon fontSize='large' onClick={handleShowCart} />
      {showCart ? <CartDetail /> : null}
    </div>
  );
};

export default Cart;
