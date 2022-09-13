import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditMessage from '../EditMessage';

function EditMessageModal({message, socket}) {
    const [showModal, setShowModal] = useState(false);
  
    return (
        <div className='message_modal' onClick={(e)=> e.stopPropagation()} >
            <button className='chat_modal_button' onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditMessage setShowModal={setShowModal} message={message} socket={socket} />
                </Modal>
            )}
        </div>
    );
};

export default EditMessageModal;