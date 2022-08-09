import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import CreateChannel from '../CreateChannel';

const CreateChannelModal = ({currentUser}) => {
    const [showModal, setShowModal] = useState(false);
  
    return (
        <div className='channel_modal' onClick={(e)=> e.stopPropagation()} >
            <button className='create_channel' onClick={() => setShowModal(true)}>+</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateChannel currentUser={currentUser} setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    );
};

export default CreateChannelModal;