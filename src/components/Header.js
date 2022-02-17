import '../styles/header.css';
import Cart from './Cart';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

const Header = () => {
  return (
    <div className='header-container'>
      <div className='logo'>
        <FlightTakeoffIcon fontSize='large' />
        <p>TrueFligth</p>
      </div>
      <Cart />
    </div>
  );
};

export default Header;
