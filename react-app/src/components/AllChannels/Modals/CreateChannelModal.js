import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import CreateChannel from '../CreateChannel';

const CreateChannelModal = ({currentUser}) => {
    const [showModal, setShowModal] = useState(false);
  
    return (
        <>
            <button className='create_channel' onClick={() => setShowModal(true)}>+</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateChannel sessionUser={currentUser} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
};

export default CreateChannelModal;