import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/header.css';
import Cart from '../Cart';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const handleClick = () => {
    if (location.pathname !== '/') {
      dispatch({ type: 'booking/resetinputs' });
      dispatch({ type: 'flights/reset' });
      dispatch({ type: 'ui/reset' });
    }
    navigate('/');
  };
  return (
    <div className='header-container'>
      <div className='logo' onClick={handleClick}>
        <FlightTakeoffIcon fontSize='large' />
        <p>TrueFlight</p>
      </div>
      <Cart />
    </div>
  );
};

export default Header;
