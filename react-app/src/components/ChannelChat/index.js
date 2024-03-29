import React, { useState, useEffect } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import { useChannel } from '../../context/channelContext';
import DeleteChatModal from './Modals/DeleteChatModal';
import EditChatModal from './Modals/EditChatModal';
import * as channelMessagesReducer from '../../store/channelMessages';
import * as channelsReducer from '../../store/channels';
import * as dmReducer from '../../store/directMessages';
import defaultProfileImage from '../../default_profile_image.jpg';

import './ChannelChat.css';
import '../AllChannels/AllChannels.css';
import '../NavBar/NavBar.css';

let socket;


const ChannelChat = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { channelId } = useParams();
    const currentUser = useSelector((state) => state.session.user)
    // const channel = useSelector((state) => state.channels[channelId]);
    const channelsState = useSelector((state) => state.channels);
    const channel = channelsState[channelId];
    const channelMessages = Object.values(useSelector((state) => state.channelMessages));
    
    const [content, setContent] = useState("");
    const { setCurrentChannel } = useChannel();

    // Set Current Channel Context
    useEffect(()=> {
        setCurrentChannel([ "C", +channelId ]);
    }, [setCurrentChannel, channelId])
        

    // console.log('---------------CHANNEL:', channelId, '-------------------');
    // console.log('--------messages: ', messages, '------------')

    // Edit Timestamp
    const createdAt = (timestamp) => {
        return timestamp.split('.')[0];
    }

    // Handles Username Click
    const onClick = (e, id) => {
        e.preventDefault();
        history.push(`/users/${id}`);
    };

    // Websocket.io UseEffect
    useEffect(() => {
        
        // open socket connection
        // create websocket
        socket = io();

        // listen for chat events
        socket.on("chat", async(res) => {
            // when we recieve a chat, add it into our messages array in state
            // console.log('-------Add/Edit Socket Res: ', res, '----------');
            // await dispatch(channelMessagesReducer.actionAddEditMessage(res));
            if (res === "channel") {
                await dispatch(channelsReducer.thunkGetChannels());
                await dispatch(dmReducer.thunkGetMessages(currentUser.id));
            } else {
                await dispatch(channelMessagesReducer.thunkGetMessages(channelId));
                await dispatch(channelsReducer.thunkGetChannels());
                await dispatch(dmReducer.thunkGetMessages(currentUser.id));
            }

            // setMessages(response);
        })

        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [dispatch, channelId, currentUser])

    // Get Channel Messages Dispatch
    useEffect(() => {
        (async() => {
            await dispatch(channelMessagesReducer.thunkGetMessages(channelId));

            // console.log('---------- UseEffect Running ----------');
            // setMessages(res);
        })()
    }, [dispatch, channelId, content, currentUser]);

    // Handle Message Submit
    const sendChat = async(e) => {
        e.preventDefault();

        const res = await dispatch(channelMessagesReducer.thunkAddMessage(content, channelId));
        if (res) {
            socket.emit("chat", res)
            // setMessages(channelMessages);
            setContent("")
        };
    };

    // Redirect if not signed-in
    if (!currentUser) return <Redirect to="/splash" />;

    return ((currentUser && channel) ? (
        <div className='content'>
            <div className='title_div'>This is the very beginning of the #{channel.title} channel</div>
            {channel.description ?
                <div className='description_div'>{channel.description}</div>
            : <></>}
            { channelMessages && <div className='all_messages'>
                {channelMessages.map((message, ind) => (
                    <div className='message_div' key={ind}>
                        <div className='pic_name'>
                            <img
                              className='menu_img chat_img'
                              onClick={(e) => onClick(e, message.user.id)}
                              src={message.user.profile_pic ? message.user.profile_pic : defaultProfileImage}
                              alt='navbar profile'
                            />
                            <div className='chat_tm'>
                                <div className='timestamp'>{createdAt(message.created_at)}</div>
                                <div
                                    onClick={(e) => onClick(e, message.user.id)}
                                    className='user_name'>
                                        {`${message.user.nickname ? message.user.nickname : message.user.full_name}:`}
                                </div>
                            </div>
                        </div>
                        <div className='message_content'>{`${message.message}`} { message.edited ? <p className="message_edited">(edited)</p> : <></> }</div>
                        <div className='edit_delete_chat'>
                            {(message.user.id === currentUser.id) && <EditChatModal message={message} socket={socket} />}
                            {(message.user.id === currentUser.id) && <DeleteChatModal message={message} socket={socket} />}
                        </div>
                    </div>
                ))}
            </div> }
            <form className='chat_form' onSubmit={sendChat}>
                <textarea
                    value={content}
                    className='dark chat_textarea'
                    placeholder={`Message #${channel.title}`}
                    onChange={(e) => setContent(e.target.value)}
                />
                { 254 < content.length && <div className='message_length' style={{color: "red"}}>
                    {254 - content.length}
                </div> }
                {(255 > content.length && content.length > 0) && <button className='form_divs chat_submit' type="submit">Send</button>}
            </form>
        </div>
    ) : <div></div>);
};

export default ChannelChat;