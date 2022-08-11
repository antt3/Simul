import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import * as channelMessagesReducer from '../../store/channelMessages';

let socket;

const ChannelChat = () => {
    const dispatch = useDispatch();
    const { channelId } = useParams();
    const currentUser = useSelector((state) => state.session.user)
    const channel = useSelector((state) => state.channels[channelId]);
    const channelMessages = useSelector((state) => Object.values(state.channelMessages));
    const [content, setContent] = useState("");
    const [messages, setMessages] = useState(channelMessages);
    console.log('--------messages: ', messages, '------------')

    useEffect(() => {
        
        // open socket connection
        // create websocket
        socket = io();

        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    useEffect(() => {
        (async() => {
        const res = await dispatch(channelMessagesReducer.thunkGetMessages(channelId));
        // console.log('----------res: ', res, '----------');
        setMessages(res);
        })()
    }, [dispatch, channelId, content]);

    const sendChat = async(e) => {
        e.preventDefault();

        const res = await dispatch(channelMessagesReducer.thunkAddMessage(content, channelId));
        if (res === 'All Good') {
            setMessages(channelMessages);
            setContent("")
        };
    };

    if (!currentUser) return <Redirect to="/login" />;

    return ((currentUser && channel) ? (
        <div>
            <div>
                {messages.map((message, ind) => (
                    <div key={ind}>{`${message.user.nickname ? message.user.nickname : message.user.full_name}: ${message.message}`}</div>
                ))}
            </div>
            <form onSubmit={sendChat}>
                <input
                    value={content}
                    placeholder={`Message #${channel.title}`}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    ) : <div></div>);
};

export default ChannelChat;