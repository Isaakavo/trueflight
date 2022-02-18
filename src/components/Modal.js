import '../styles/modal.css';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName} >
      <section className='modal-main'>
        {children}
        <button className='modal-button' type='button' onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;
