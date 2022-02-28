import React from 'react';
import { useSelector } from 'react-redux';

import Modal from '../Modal/Modal';

import { formatDate } from '../../reducers/helpers';
import { coupons } from '../../reducers/types';

const FinishModal = ({ inputs, showModal, hideModal, coupon }) => {
  const booking = useSelector(({ data }) => data.booking);
  const discountClass = coupon ? 'discount' : '';

  const calculateTotal = () => {
    const total = booking.reservations.reduce(
      (acc, val) =>
        Math.round((acc + val.amount * val.passagers.number) * 100) / 100,
      0
    );
    if (coupons[coupon] !== undefined) {
      const discount = (coupons[coupon] * total) / 100;
      return total - discount;
    }

    return total;
  };

  return (
    <Modal show={showModal} handleClose={hideModal}>
      <div className='modal-container'>
        <h2>This tickets are yours!</h2>
        <h4>Your purchase: </h4>
        <h5>Order id: {booking.orderId}</h5>
        <section className='modal-section'>
          <div className='info-container'>
            <b>Name: </b>{' '}
            <p>
              {inputs.firstname + ' ' + inputs.lastname + ' ' + inputs.surname}
            </p>
          </div>
          <div className='info-container'>
            <b>Address: </b>
            <p>{inputs.address}</p>
          </div>
          <div className='info-container'>
            <b>e-mail:</b>
            <p>{inputs.email}</p>
          </div>
        </section>
        <section>
          {coupons[coupon] ? (
            <div className='info-container'>
              <b>coupon:</b>
              <p>{coupons[coupon] + '% applied'}</p>
            </div>
          ) : null}
          <h4>Flight information: </h4>
          <section className='flight-info-container'>
            {booking.reservations.map((x, i) => {
              return (
                <div className='flight-container' key={i}>
                  <div>
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
                    <b>Departure</b> <p>{formatDate(x.dates.departure)}</p>
                  </div>
                  <div>
                    <b>Passengers</b> <p>{x.passagers.number}</p>
                    <b>Total</b> <p className={discountClass}>${x.total}</p>
                  </div>
                </div>
              );
            })}
            <div className='flight-container'>
              <p className={'total-column '}>Total: ${calculateTotal()}</p>
            </div>
          </section>
        </section>
      </div>
    </Modal>
  );
};

export default FinishModal;
