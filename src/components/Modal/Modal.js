import Button from '../common/Button';

import '../../styles/modal.css';

const Modal = ({
  handleClose,
  show,
  children,
  handleConfirm,
  showConfirmation,
}) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
        <div className='button-container'>
          {showConfirmation ? (
            <Button
              extraClass='small-button'
              handler={handleConfirm}
              label='Confirm'
            />
          ) : null}
          <Button
            extraClass='small-button'
            handler={handleClose}
            label='Close'
          />
        </div>
      </section>
    </div>
  );
};

export default Modal;
