import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
let socket;

const ChannelChat = () => {
    const { channelId } = useParams();
    const currentUser = useSelector((state) => state.session.user)
    const channel = useSelector((state) => state.channels[channelId]);
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

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", { user: currentUser.full_name, msg: chatInput });
        setChatInput("")
    }

    if (!currentUser) return <Redirect to="/login" />;

    return (currentUser && (
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
    ));
};

export default ChannelChat;