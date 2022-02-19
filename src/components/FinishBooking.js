import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Input from './Input';
import ConfirmationModal from './ConfirmationModal';
import FinishModal from './FinishModal';
import Wrapper from './Wrapper';

const inputsDefault = {
  firstname: '',
  lastname: '',
  surname: '',
  direction: '',
  email: '',
  firstnameValid: false,
  lastnameValid: false,
  surnameValid: false,
  directionValid: false,
  emailValid: false,
};

const formErrorsDefault = {
  firstname: '',
  lastname: '',
  surname: '',
  direction: '',
  email: '',
};

const FormErrors = ({ formErrors }) => {
  return (
    <div>
      {Object.keys(formErrors).map((x, i) => {
        if (formErrors[x].length > 0) {
          return (
            <p key={i}>
              {x} {formErrors[x]}
            </p>
          );
        } else {
          return '';
        }
      })}
    </div>
  );
};

const FinishBooking = () => {
  const [inputs, setInputs] = useState(inputsDefault);
  const [formErrors, setFormErrors] = useState(formErrorsDefault);
  const [disabled, setDisabled] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const booking = useSelector(({ booking }) => booking);

  const handleChange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    let fieldValidationErrors = formErrors;
    let firstnameValid = inputs.firstnameValid;
    let lastnameValid = inputs.lastname;
    let surnameValid = inputs.surname;
    let directionValid = inputs.direction;
    let emailValid = inputs.email;

    switch (name) {
      case 'firstname':
        firstnameValid = value.length > 0;
        fieldValidationErrors.firstname = firstnameValid ? '' : ' not valid';
        break;
      case 'lastname':
        lastnameValid = value.length > 0;
        fieldValidationErrors.lastname = lastnameValid ? '' : ' not valid';
        break;
      case 'surname':
        surnameValid = value.length > 0;
        fieldValidationErrors.surname = surnameValid ? '' : ' not valid';
        break;
      case 'direction':
        directionValid = value.length > 0;
        fieldValidationErrors.direction = directionValid ? '' : ' not valid';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' not valid';
        break;
      default:
        break;
    }

    const newInputs = {
      ...inputs,
      [name]: value,
      firstnameValid,
      lastnameValid,
      surnameValid,
      directionValid,
      emailValid,
    };

    setInputs(newInputs);
    setFormErrors({ ...formErrors, fieldValidationErrors });
    validateDisabled();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      firstnameValid,
      lastnameValid,
      surnameValid,
      directionValid,
      emailValid,
    } = inputs;
    debugger;
    if (
      firstnameValid &&
      lastnameValid &&
      surnameValid &&
      directionValid &&
      emailValid
    ) {
      setConfirmationModal(true);
      setDisabled(false);
    }
  };

  const hideModal = () => {
    debugger;
    setShowModal(false);
    dispatch({ type: 'booking/reset' });
    navigate('/');
  };

  const handleConfirmationModal = () => {
    setConfirmationModal(false);
    setShowModal(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationModal(false);
  }

  const validateDisabled = () => {
    if (
      inputs.firstnameValid &&
      inputs.lastnameValid &&
      inputs.surnameValid &&
      inputs.directionValid &&
      inputs.emailValid
    ) {
      setDisabled(false);
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    if (booking.length === 0) {
      setDisabled(true);
      setButtonDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [booking]);

  let width = window.innerWidth;
  return (
    <Wrapper>
      <ConfirmationModal
        show={confirmationModal}
        handleConfirm={handleConfirmationModal}
        handleClose={handleCloseConfirmation}
        showConfirmation
      />
      <FinishModal showModal={showModal} hideModal={hideModal} inputs={inputs} />
      <h3>Fill the form to get your tickets!</h3>
      <form className='inputs-container' onSubmit={handleSubmit}>
        {width < 768 ? (
          <>
            <div className='airports-container'>
              <Input
                name='firstname'
                type='text'
                className='inputs'
                placeholder='First name'
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
            <div className='airports-container'>
              <Input
                name='lastname'
                className='inputs'
                type='text'
                placeholder='Last name'
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
            <div className='airports-container'>
              <Input
                name='surname'
                className='inputs'
                type='text'
                placeholder='Sur name'
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
            <div className='airports-container'>
              <Input
                name='direction'
                className='inputs'
                type='text'
                placeholder='Direction'
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
            <div className='airports-container'>
              <Input
                name='email'
                className='inputs'
                type='text'
                placeholder='e-mail'
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
            <div className='airports-container'>
              <Input
                name='code'
                className='inputs'
                type='text'
                placeholder='discount coupon'
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
          </>
        ) : (
          <>
            <div className='airports-container'>
              <Input
                name='firstname'
                type='text'
                className='inputs'
                placeholder='First name'
                onChange={handleChange}
                disabled={disabled}
              />
              <Input
                name='lastname'
                className='inputs'
                type='text'
                placeholder='Last name'
                onChange={handleChange}
                disabled={disabled}
              />
              <Input
                name='surname'
                className='inputs'
                type='text'
                placeholder='Sur name'
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
            <div className='airports-container'>
              <Input
                name='direction'
                className='inputs'
                type='text'
                placeholder='Direction'
                onChange={handleChange}
                disabled={disabled}
              />
              <Input
                name='email'
                className='inputs'
                type='text'
                placeholder='e-mail'
                onChange={handleChange}
                disabled={disabled}
              />
              <Input
                name='code'
                className='inputs'
                type='text'
                placeholder='discount coupon'
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
          </>
        )}
        <FormErrors formErrors={formErrors} />
        <Input
          type='submit'
          className='search-button'
          value='Get Tickets!'
          disabled={buttonDisabled}
        />
      </form>
    </Wrapper>
  );
};

export default FinishBooking;
