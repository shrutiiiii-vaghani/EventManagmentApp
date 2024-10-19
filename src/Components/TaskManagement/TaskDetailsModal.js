import React, { useState } from 'react';
import Modal from 'react-modal';

const TaskDetailsModal = ({ task }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
  <button onClick={openModal}>View Details</button>
  <Modal isOpen={isOpen} onRequestClose={closeModal} style={{
    content: {
      width: '300px', 
      height: '200px', 
      margin: 'auto', 
      padding: '20px', 
    }
  }}>
    <h2>{task.title}</h2>
    <p>{task.description}</p>
    <button onClick={closeModal}>Close</button>
  </Modal>
</div>
  );
};

export default TaskDetailsModal;
