import React, { useState, useEffect } from "react";
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';

import './DirectMessages.css';

let socket;


const DirectMessages = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { otherUserId } = useParams();
    const currentUser = useSelector((state) => state.session.user);
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
        <></>
    );
};

export default DirectMessages;