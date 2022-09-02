import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditChannel from '../EditChannel';

function EditChannelModal({channel, socket}) {
    const [showModal, setShowModal] = useState(false);
  
    return (
        <div className='channel_modal' onClick={(e)=> e.stopPropagation()} >
            <button className='modal_button' onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditChannel setShowModal={setShowModal} channel={channel} socket={socket} />
                </Modal>
            )}
        </div>
    );
};

export default EditChannelModal;