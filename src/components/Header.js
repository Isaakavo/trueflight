import '../styles/header.css';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

const Header = () => {
  return (
    <div className='header-container'>
      <div className='logo'>
        <FlightTakeoffIcon fontSize="large"/>
        <p>TrueFligth</p>
      </div>
      <div className='shopping-cart'>
        <ShoppingBagIcon fontSize="large" />
      </div>
    </div>
  );
};

export default Header;
