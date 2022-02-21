import { useState } from 'react';
import { useSelector } from 'react-redux';
import CartDetail from './CartDetail';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const Cart = () => {
  const [showCart, setShowCart] = useState(false);
  const booking = useSelector(({data}) => data.booking);

  const handleShowCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className='shopping-cart'>
      {booking.length > 0 ? (
        <span className='bubble'>
          <span className='bubble-alert'></span>
        </span>
      ) : null}
      <ShoppingBagIcon fontSize='large' onClick={handleShowCart} />
      {showCart ? <CartDetail setShowCart={setShowCart} /> : null}
    </div>
  );
};

export default Cart;
