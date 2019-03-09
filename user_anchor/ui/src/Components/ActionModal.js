import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ActionModal = ({modalData, handleClose}) => {
  return (
    <Modal show={true} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>
          {modalData.action === 'meeting' || modalData.action === 'jiraBug' ?
            modalData.message.subject : modalData.message}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {modalData.action === 'url' || modalData.action === 'jiraBug' ? <iframe src={modalData.url} style={{
        width: '100%',
        wordBreak: 'break-all',
        overflowX: 'hidden'
      }}>
        <p>Your browser does not support iframes.</p>
      </iframe> :
      `Host: ${modalData.host}`
      `Attendees: ${modalData.attendees}`
      `Day: ${modalData.date}`
      `time: ${modalData.time}`
    }
      </Modal.Body>
    </Modal>
  );
}

export default ActionModal;
