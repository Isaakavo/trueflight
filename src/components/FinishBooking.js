import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from './Input';
import Modal from './Modal';
import Wrapper from './Wrapper';

const inputsDefault = {
  firstname: '',
  lastname: '',
  surname: '',
  direction: '',
  email: '',
};

const FinishBooking = () => {
  const [inputs, setInputs] = useState(inputsDefault);
  const [disabled, setDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const dispatch = useDispatch();
  const booking = useSelector(({ booking }) => booking);

  console.log(booking);

  const handleChange = ({ target }) => {
    console.log({ ...inputs, [target.name]: target.value });
    setInputs({ ...inputs, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const newObj = {...booking, ...inputs};
    // debugger;
    // console.log({newObj});
    // dispatch({type: 'booking/final', payload: newObj});
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <Wrapper>
      <Modal show={showModal} handleClose={hideModal}>
        <div className='modal-container'>
          <h2>This tickets are yours!</h2>
          <h4>Your purchase: </h4>
          <section className='modal-section'>
            <div>
              <b>Name: </b>{' '}
              <p>
                {inputs.firstname}
                {inputs.lastname}
                {inputs.surname}
              </p>
            </div>
            <div>
              <b>Direction: </b>
              <p>{inputs.direction}</p>
            </div>
            <div>
              <b>email:</b>
              <p>{inputs.email}</p>
            </div>
          </section>
          <section>
            <h4>Flight information: </h4>
            <div>
              {booking.map((x, i) => {
                return (
                  <div className='flight-container' key={i}>
                    <div >
                      <b>Origin</b>{' '}
                      <p>
                        {x.origin.name} {x.origin.code}
                      </p>
                      <b>Destination</b>{' '}
                      <p>
                        {x.destination.name} {x.destination.code}
                      </p>
                    </div>
                    <div>
                      <b>Departure</b> <p>{x.departure}</p>
                      <b>Comeback</b> <p>{x.comeback}</p>
                    </div>
                    <div>
                      <b>Passagers</b> <p>{x.passagers.number}</p>
                      <b>Total</b> <p>{x.passagers.number * x.amount}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </Modal>
      <form className='inputs-container' onSubmit={handleSubmit}>
        <Input
          name='firstname'
          type='text'
          placeholder='First name'
          onChange={handleChange}
        />
        <Input
          name='lastname'
          type='text'
          placeholder='Last name'
          onChange={handleChange}
        />
        <Input
          name='surname'
          type='text'
          placeholder='Sur name'
          onChange={handleChange}
        />
        <Input
          name='direction'
          type='text'
          placeholder='Direction'
          onChange={handleChange}
        />
        <Input
          name='email'
          type='text'
          placeholder='e-mail'
          onChange={handleChange}
        />
        <Input type='submit' value='Get Tickets!' disabled={disabled} />
      </form>
    </Wrapper>
  );
};

export default FinishBooking;
