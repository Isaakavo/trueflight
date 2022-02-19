import '../styles/modal.css';

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
        <div className='button-container' >
          {showConfirmation ? (
            <button
              className='modal-button'
              type='button'
              onClick={handleConfirm}
            >
              Confirm
            </button>
          ) : null}
          <button className='modal-button' type='button' onClick={handleClose}>
            Close
          </button>
        </div>
      </section>
    </div>
  );
};

export default Modal;
