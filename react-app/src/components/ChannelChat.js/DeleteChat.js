import React from 'react';
import { useDispatch } from "react-redux";
import * as channelMessagesReducer from "../../store/channelMessages";


const DeleteChat = ({setShowModal, socket, message}) => {
    const dispatch = useDispatch();


    const handleClick = async(e) => {
        e.preventDefault();
        const res = await dispatch(channelMessagesReducer.thunkRemoveMessage(message.id));
        socket.emit("delete", res);
        setShowModal(false);
    };

    const handleClick2 = async(e) => {
        e.preventDefault();
        setShowModal(false);

    };

    return (
        <div className='modal'>
            <div className='confirm_del'>
                <h3>
                    Are you sure you want to delete your message?
                </h3>
                <button onClick={(e)=> handleClick(e)}>Confirm</button>
                <button onClick={(e)=> handleClick2(e)}>Cancel</button>
            </div>
        </div>
    );
};

export default DeleteChat;