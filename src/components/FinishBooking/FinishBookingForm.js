import React from 'react';
import { useState, useEffect } from 'react';
import FormErrors from '../common/FormErrors';

function useWindowResize() {
  const [dimension, setDimension] = useState([0, 0]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setDimension([window.innerWidth, window.innerHeight]);
    });
    return () => {
      window.removeEventListener('resize', () => {
        setDimension([window.innerWidth, window.innerHeight]);
      });
    };
  }, []);

  return dimension;
}

const minWidth = 968;

const FinishBookingForm = ({
  buttonDisabled,
  formErrors,
  handleSubmit,
  handleChange,
  disabled,
}) => {
  const [width] = useWindowResize();
  const [change, setChange] = useState(width);

  useEffect(() => {
    setChange(width);
  }, [width]);
  return (
    <>
      <h3>Fill the form to get your tickets!</h3>
      <form className='inputs-container' onSubmit={handleSubmit}>
        {change <= minWidth ? (
          <>
            <div className='airports-container'>
              <input
                name='firstname'
                type='text'
                className='inputs'
                placeholder='First name'
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
            <div className='airports-container'>
              <input
                name='lastname'
                className='inputs'
                type='text'
                placeholder='Last name'
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
            <div className='airports-container'>
              <input
                name='surname'
                className='inputs'
                type='text'
                placeholder='Sur name'
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
            <div className='airports-container'>
              <input
                name='address'
                className='inputs'
                type='text'
                placeholder='Address'
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
            <div className='airports-container'>
              <input
                name='email'
                className='inputs'
                type='email'
                placeholder='e-mail'
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
            <div className='airports-container'>
              <input
                name='coupon'
                className='inputs'
                type='text'
                placeholder='Discount coupon (use uppercase)'
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
          </>
        ) : (
          <>
            <div className='airports-container'>
              <input
                name='firstname'
                type='text'
                className='inputs'
                placeholder='First name'
                onChange={handleChange}
                disabled={disabled}
              />
              <input
                name='lastname'
                className='inputs'
                type='text'
                placeholder='Last name'
                onChange={handleChange}
                disabled={disabled}
              />
              <input
                name='surname'
                className='inputs'
                type='text'
                placeholder='Sur name'
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
            <div className='airports-container'>
              <input
                name='address'
                className='inputs'
                type='text'
                placeholder='Address'
                onChange={handleChange}
                disabled={disabled}
              />
              <input
                name='email'
                className='inputs'
                type='email'
                placeholder='e-mail'
                onChange={handleChange}
                disabled={disabled}
              />
              <input
                name='coupon'
                className='inputs'
                type='text'
                placeholder='Discount coupon (use uppercase)'
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
          </>
        )}
        <FormErrors formErrors={formErrors} />
        <input
          type='submit'
          className='search-button'
          value='Get Tickets!'
          disabled={buttonDisabled}
        />
      </form>
    </>
  );
};

export default FinishBookingForm;
