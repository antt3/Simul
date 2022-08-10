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
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState(useSelector((state) => Object.values(state.channelMessages)));

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
    }, [messages])

    useEffect(() => {
        dispatch(channelMessagesReducer.thunkGetMessages(channelId));
    }, [dispatch, channelId]);

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = async(e) => {
        e.preventDefault()

        const newMessage = {
            
        };

        dispatch(channelMessagesReducer.actionAddEditMessage())
        socket.emit("chat", { user: currentUser.full_name, msg: chatInput });
        setChatInput("")
    }

    if (!currentUser) return <Redirect to="/login" />;

    return ((currentUser && channel) ? (
        <div>
            <div>
                {messages.map((message, ind) => (
                    <div key={ind}>{`${message.user.full_name}: ${message.message}`}</div>
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