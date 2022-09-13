import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import DeleteMessage from '../DeleteMessage';

const DeleteMessageModal = ({message, socket }) => {
    const [showModal, setShowModal] = useState(false);
  
    return (
        <div className='chat_modal' onClick={(e)=> e.stopPropagation()} >
            <button className='chat_modal_button' onClick={() => setShowModal(true)}>Delete</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteMessage message={message} socket={socket} setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    );
};

export default DeleteMessageModal;