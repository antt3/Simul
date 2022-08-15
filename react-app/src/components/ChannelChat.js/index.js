import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import DeleteChatModal from './modals/DeleteChatModal';
import EditChatModal from './modals/EditChatModal';
import * as channelMessagesReducer from '../../store/channelMessages';
import './ChannelChat.css';

let socket;

const ChannelChat = () => {
    const dispatch = useDispatch();
    const { channelId } = useParams();
    const currentUser = useSelector((state) => state.session.user)
    const channel = useSelector((state) => state.channels[channelId]);
    const channelMessages = Object.values(useSelector((state) => state.channelMessages));
    
    const [content, setContent] = useState("");
    // console.log('--------messages: ', messages, '------------')

    useEffect(() => {
        
        // open socket connection
        // create websocket
        socket = io();

        // listen for chat events
        socket.on("chat", async(res) => {
            // when we recieve a chat, add it into our messages array in state
            // console.log('-------Add/Edit Socket Res: ', res, '----------');
            // await dispatch(channelMessagesReducer.actionAddEditMessage(res));
            await dispatch(channelMessagesReducer.thunkGetMessages(channelId))
            // setMessages(response);
        })

        socket.on("delete", async (res) => {
            // console.log('-------Delete Socket Res: ', res, '----------');
            
            await dispatch(channelMessagesReducer.thunkGetMessages(channelId))
            // setMessages(response);
          });

        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [dispatch, channelId])

    useEffect(() => {
        (async() => {
            await dispatch(channelMessagesReducer.thunkGetMessages(channelId));
            // console.log('---------- UseEffect Running ----------');
            // setMessages(res);
        })()
    }, [dispatch, channelId, content, currentUser]);

    const sendChat = async(e) => {
        e.preventDefault();

        const res = await dispatch(channelMessagesReducer.thunkAddMessage(content, channelId));
        if (res) {
            socket.emit("chat", res)
            // setMessages(channelMessages);
            setContent("")
        };
    };

    if (!currentUser) return <Redirect to="/splash" />;

    return ((currentUser && channel) ? (
        <div className='channels'>
            { channelMessages && <div>
                {channelMessages.map((message, ind) => (
                    <div key={ind}>
                        <div>{`${message.user.nickname ? message.user.nickname : message.user.full_name}: ${message.message} (${message.created_at})`}</div>
                        {(message.user.id === currentUser.id) && <DeleteChatModal message={message} socket={socket} />}
                        {(message.user.id === currentUser.id) && <EditChatModal message={message} socket={socket} />}
                    </div>
                ))}
            </div> }
            <form onSubmit={sendChat}>
                <input
                    value={content}
                    placeholder={`Message #${channel.title}`}
                    onChange={(e) => setContent(e.target.value)}
                />
                {(255 > content.length && content.length > 0) && <button type="submit">Send</button>}
            </form>
        </div>
    ) : <div></div>);
};

export default ChannelChat;