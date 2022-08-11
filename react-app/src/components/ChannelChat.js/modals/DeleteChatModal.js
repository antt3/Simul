import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import DeleteChat from '../DeleteChat';

const DeleteChatModal = ({message, socket}) => {
    const [showModal, setShowModal] = useState(false);
  
    return (
        <div className='chat_modal' onClick={(e)=> e.stopPropagation()} >
            <button className='delete_chat' onClick={() => setShowModal(true)}>Delete</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteChat message={message} socket={socket} setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    );
};

export default DeleteChatModal;