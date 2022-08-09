import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import DeleteChannel from '../DeleteChannel';

const DeleteChannelModal = ({channel}) => {
    const [showModal, setShowModal] = useState(false);
  
    return (
        <>
            <button className='delete_channel' onClick={() => setShowModal(true)}>Delete</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteChannel channel={channel} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
};

export default DeleteChannelModal;