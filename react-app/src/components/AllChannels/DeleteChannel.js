import React from 'react';

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as channelReducer from "../../store/channels";

function DeleteChannel({setShowModal, channel, socket}) {
    const dispatch = useDispatch();
    const history = useHistory();


    const handleClick = async(e) => {
        e.preventDefault();
        const deleted = await dispatch(channelReducer.thunkDeleteChannel(channel.id));

        if (deleted) {
        setShowModal(false);
        history.push('/');
        console.log("-----------------deleted: ", deleted, '-------------')
        socket.emit("chat", "channel");
        };
    };

    const handleClick2 = async(e) => {
        e.preventDefault();
        setShowModal(false);

    };

    return (
        <div className='modal'>
            <div className='c_div'>
                <h3>
                    Are you sure you want to delete your channel?
                </h3>
                <div>
                    <button className="form_divs other_cancel" onClick={(e)=> handleClick2(e)}>Cancel</button>
                    <button className='form_divs other_submit' onClick={(e)=> handleClick(e)}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteChannel;