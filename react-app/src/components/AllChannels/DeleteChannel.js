import React from 'react';

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as channelReducer from "../../store/channels";

function DeleteChannel({setShowModal, channel}) {
    const dispatch = useDispatch();
    const history = useHistory();


    const handleClick = async(e) => {
        e.preventDefault();
        const deleted = await dispatch(channelReducer.thunkDeleteChannel(channel.id));

        if (deleted) {
        setShowModal(false);

        return history.push('/');
        };
    };

    const handleClick2 = async(e) => {
        e.preventDefault();
        setShowModal(false);

    };

    return (
        <div className='modal'>
            <div className='confirm_del'>
                <h3>
                    Are you sure you want to delete your channel?
                </h3>
                <button onClick={(e)=> handleClick(e)}>Confirm</button>
                <button onClick={(e)=> handleClick2(e)}>Cancel</button>
            </div>
        </div>
    );
};

export default DeleteChannel;