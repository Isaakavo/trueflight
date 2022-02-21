import Modal from './Modal';

const ConfirmationModal = ({
  show,
  handleConfirm,
  handleClose,
  showConfirmation,
}) => {
  return (
    <Modal
      show={show}
      handleConfirm={handleConfirm}
      handleClose={handleClose}
      showConfirmation={showConfirmation}
    >
      <div className='modal-container'>
        <h3>Do you want to buy this tickets?</h3>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
