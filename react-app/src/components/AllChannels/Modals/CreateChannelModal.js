import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import CreateChannel from '../CreateChannel';

const CreateChannelModal = ({currentUser, socket}) => {
    const [showModal, setShowModal] = useState(false);
  
    return (
        <div className='nc_modal_div' onClick={(e)=> e.stopPropagation()} >
            <button className='new_channel_modal' onClick={() => setShowModal(true)}>+</button>
            <p className='new_channel_p' onClick={() => setShowModal(true)}>Create Channel</p>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateChannel currentUser={currentUser} setShowModal={setShowModal} socket={socket} />
                </Modal>
            )}
        </div>
    );
};

export default CreateChannelModal;