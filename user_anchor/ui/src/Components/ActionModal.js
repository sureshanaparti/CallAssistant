import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ActionModal = ({modalData, handleClose}) => {
  return (
    <Modal show={true} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{modalData.message}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalData.message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ActionModal;
