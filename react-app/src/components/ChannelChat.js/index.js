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
    const channelMessages = useSelector((state) => state.channelMessages);
    console.log('-----------channelMessages: ', channelMessages, '--------');
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    useEffect(() => {
        dispatch(channelMessagesReducer.thunkGetMessages(channelId));
    }, [dispatch, channelId]);

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", { user: currentUser.full_name, msg: chatInput });
        setChatInput("")
    }

    if (!currentUser) return <Redirect to="/login" />;

    return ((currentUser && channel) ? (
        <div>
            <div>
                {messages.map((message, ind) => (
                    <div key={ind}>{`${message.user}: ${message.msg}`}</div>
                ))}
            </div>
            <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    placeholder={`Message #${channel.title}`}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    ) : <div></div>);
};

export default ChannelChat;