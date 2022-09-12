import React, { useState, useEffect } from "react";
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';

import './DirectMessages.css';

let socket;


const DirectMessages = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { refId } = useParams();
    const currentUser = useSelector((state) => state.session.user);
    const directMessages = useSelector((state) => state.session.directMessages);
    console.log('-----------Direct Messages: ', directMessages, '------------');
    const [content, setContent] = useState("");

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

    if (!currentUser) return <Redirect to="/splash" />;


    return (
        <>
            { directMessages ? Object.values(directMessages).map((directMessage, ind) => (
                <div key={ind}>{directMessage}</div>
            )) : <></>}
        </>
    );
};

export default DirectMessages;