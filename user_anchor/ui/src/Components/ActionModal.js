import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ActionModal = ({modalData, handleClose}) => {
  return (
    <Modal show={true} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{modalData.message}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {modalData.action === 'url' ? <iframe src={modalData.url} style={{
        width: '100%',
        wordBreak: 'break-all',
        overflowX: 'hidden'
      }}>
        <p>Your browser does not support iframes.</p>
      </iframe> : null}
      </Modal.Body>
    </Modal>
  );
}

export default ActionModal;
