import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import DeleteChannel from '../DeleteChannel';

const DeleteChannelModal = ({channel}) => {
    const [showModal, setShowModal] = useState(false);
  
    return (
        <div className='channel_modal' onClick={(e)=> e.stopPropagation()} >
            <button className='modal_button' onClick={() => setShowModal(true)}>Delete</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteChannel channel={channel} setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    );
};

export default DeleteChannelModal;