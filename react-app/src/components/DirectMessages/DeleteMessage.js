import React from 'react';
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import * as dmReducer from "../../store/directMessages";


const DeleteMessage = ({setShowModal, socket, message}) => {
    const dispatch = useDispatch();
    // const history = useHistory();

    const handleClick = async(e) => {
        e.preventDefault();
        const res = await dispatch(dmReducer.thunkRemoveMessage(message.id));
        if (res) {
            socket.emit("chat", res);
            setShowModal(false);
            // history.push(`/channels/${message.channel.id}`);
            // console.log('-------Delete Chat Res: ', res, '----------');
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
                    Are you sure you want to delete your message?
                </h3>
                <div>
                    <button className='form_divs other_cancel' onClick={(e)=> handleClick2(e)}>Cancel</button>
                    <button className="form_divs other_submit" onClick={(e)=> handleClick(e)}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteMessage;