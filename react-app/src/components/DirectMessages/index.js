import React, { useState, useEffect } from "react";
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import * as dmReducer from '../../store/directMessages';
import { io } from 'socket.io-client';

import './DirectMessages.css';

let socket;


const DirectMessages = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { refId } = useParams();
    const currentUser = useSelector((state) => state.session.user);
    const allMessages = useSelector((state) => state.session.directMessages);
    const [content, setContent] = useState("");

    const createdAt = (timestamp) => {
        return timestamp.split('.')[0];
    }
    
    const onClick = (e, id) => {
        e.preventDefault();
        history.push(`/users/${id}`);
    };

    useEffect(() => {
        
        // open socket connection
        // create websocket
        socket = io();

        // listen for chat events

        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    useEffect(() => {
        (async() => {
            await dispatch(dmReducer.thunkGetMessages(currentUser.id));

            // console.log('---------- UseEffect Running ----------');
            // setMessages(res);
        })()
    }, [dispatch, content, currentUser, refId]);

    if (!currentUser) return <Redirect to="/splash" />;


    return (
        <>
            { allMessages ? Object.values(allMessages).map((directMessage, ind) => (
                directMessage.ref.id === +refId ? <p key={ind}>{directMessage.message}</p> :
                <p></p>
            )) : <></>}
        </>
    );
};

export default DirectMessages;