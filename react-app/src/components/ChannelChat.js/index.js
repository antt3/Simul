import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import DeleteChatModal from './modals/DeleteChatModal';
import * as channelMessagesReducer from '../../store/channelMessages';

let socket;

const ChannelChat = () => {
    const dispatch = useDispatch();
    const { channelId } = useParams();
    const currentUser = useSelector((state) => state.session.user)
    const channel = useSelector((state) => state.channels[channelId]);
    let channelMessages = useSelector((state) => Object.values(state.channelMessages));
    const [content, setContent] = useState("");
    const [messages, setMessages] = useState(channelMessages);
    console.log('--------messages: ', messages, '------------')

    useEffect(() => {
        
        // open socket connection
        // create websocket
        socket = io();

        // listen for chat events
        socket.on("chat", (res) => {
            // when we recieve a chat, add it into our messages array in state
            dispatch(channelMessagesReducer.actionAddEditMessage(res))
                .then(dispatch(channelMessagesReducer.thunkGetMessages(channelId)))
                .then((res) => setMessages(res));
        })

        socket.on("delete", (messageId) => {
            dispatch(channelMessagesReducer.actionDeleteMessage(messageId));
          });

        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [dispatch, channelId])

    useEffect(() => {
        (async() => {
            if (currentUser) {
                const res = await dispatch(channelMessagesReducer.thunkGetMessages(channelId));
                // console.log('----------res: ', res, '----------');
                setMessages(res);
            }
        })()
    }, [dispatch, channelId, content, currentUser]);

    const sendChat = async(e) => {
        e.preventDefault();

        const res = await dispatch(channelMessagesReducer.thunkAddMessage(content, channelId));
        if (res) {
            socket.emit("chat")
            setMessages(channelMessages);
            setContent("")
        };
    };

    if (!currentUser) return <Redirect to="/login" />;

    return ((currentUser && channel) ? (
        <div>
            { messages && <div>
                {messages.map((message, ind) => (
                    <div key={ind}>
                        <div>{`${message.user.nickname ? message.user.nickname : message.user.full_name}: ${message.message}`}</div>
                        {(message.user.id === currentUser.id) && <DeleteChatModal message={message} socket={socket} />}
                    </div>
                ))}
            </div> }
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