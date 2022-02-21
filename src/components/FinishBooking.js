import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Input from './Input';
import ConfirmationModal from './ConfirmationModal';
import FinishBookingForm from './FinishBookingForm';
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

const FinishBooking = () => {
  const [formErrors, setFormErrors] = useState(formErrorsDefault);
  const [inputs, setInputs] = useState(inputsDefault);
  const [disabled, setDisabled] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  debugger;
  const booking = useSelector(({ data }) => data.booking);

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
  };

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

  return (
    <Wrapper>
      <ConfirmationModal
        show={confirmationModal}
        handleConfirm={handleConfirmationModal}
        handleClose={handleCloseConfirmation}
        showConfirmation
      />
      <FinishModal
        showModal={showModal}
        hideModal={hideModal}
        inputs={inputs}
      />
      <FinishBookingForm
        buttonDisabled={buttonDisabled}
        formErrors={formErrors}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        disabled={disabled}
      />
    </Wrapper>
  );
};

export default FinishBooking;
