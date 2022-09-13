import React, { useState, useEffect } from "react";
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';

import DeleteMessageModal from './Modals/DeleteMessageModal';
import EditMessageModal from './Modals/EditMessageModal';
import * as dmReducer from '../../store/directMessages';
import defaultProfileImage from '../../default_profile_image.jpg';

import './DirectMessages.css';
import '../ChannelChat/ChannelChat.css';

let socket;


const DirectMessages = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { refId } = useParams();
    const currentUser = useSelector((state) => state.session.user);
    const allMessages = useSelector((state) => state.directMessages);
    console.log('------------------.--.- All Messages: ', allMessages, '--------.-.-.-.-.-.-')
    const [content, setContent] = useState("");
    const [ref, setRef] = useState(null);
    if (ref) console.log('------------------.--.- Ref Nickname: ', ref[0].nickname, '--------.-.-.-.-.-.-')

    const createdAt = (timestamp) => {
        return timestamp.split('.')[0];
    }

    const onClick = (e, id) => {
        e.preventDefault();
        history.push(`/users/${id}`);
    };

    const sendChat = async(e) => {
        e.preventDefault();

        const res = await dispatch(dmReducer.thunkAddMessage(content, +refId));
        if (res) {
            socket.emit("chat", res)
            // setMessages(channelMessages);
            setContent("")
        };
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
        async function fetchData() {
          const response = await fetch('/api/users/');
          const responseData = await response.json();
          const users = responseData.users;
          const user = users.filter(user => user.id === +refId);
          setRef(user);
        }
        fetchData();
      }, [refId]);

    useEffect(() => {
        (async() => {
            await dispatch(dmReducer.thunkGetMessages(currentUser.id));

            // console.log('---------- UseEffect Running ----------');
            // setMessages(res);
        })()
    }, [dispatch, content, currentUser, refId]);

    if (!currentUser) return <Redirect to="/splash" />;


    return ((currentUser && allMessages && ref) ? (
        <div className='content'>
                { currentUser.id !== ref[0].id ? 
                    <div className='title_div'>
                        This is the very beginning of your direct message history with @{`${ref[0].nickname ? ref[0].nickname : ref[0].full_name}`}. Only the two of you are in this conversation.
                    </div>
                :
                    <div className='title_div'>
                        This is your space. Draft messages, list your to-dos, or keep links and files handy. You can also talk to yourself here, but please bear in mind you'll have to supply both sides of the conversation.
                    </div>
                }
            { currentUser.id !== ref[0].id ? <div>
                {Object.values(allMessages).map((message, ind) => (
                    message.user.id === ref[0].id || message.ref.id === ref[0].id ? 
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
                            <div className='message_content'>{`${message.message}`}</div>
                            <div className='edit_delete_chat'>
                                {(message.user.id === currentUser.id) && <EditMessageModal message={message} socket={socket} />}
                                {(message.user.id === currentUser.id) && <DeleteMessageModal message={message} socket={socket} />}
                            </div>
                        </div>
                    : <></>
                ))}
            </div> : <div>
                {Object.values(allMessages).map((message, ind) => (
                    message.user.id === ref[0].id && message.ref.id === ref[0].id ? 
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
                            <div className='message_content'>{`${message.message}`}</div>
                            <div className='edit_delete_chat'>
                                {(message.user.id === currentUser.id) && <EditMessageModal message={message} socket={socket} />}
                                {(message.user.id === currentUser.id) && <DeleteMessageModal message={message} socket={socket} />}
                            </div>
                        </div>
                    : <></>
                ))}
            </div>
            }
            <form className='chat_form' onSubmit={sendChat}>
                <textarea
                    value={content}
                    className='dark chat_textarea'
                    placeholder={currentUser.id !== ref[0].id ? `Message ${ref[0].nickname ? ref[0].nickname : ref[0].full_name}` : 'Jot something down'}
                    onChange={(e) => setContent(e.target.value)}
                />
                { 254 < content.length && <div className='form_label message_length' style={{color: "red"}}>
                    {254 - content.length}
                </div> }
                {(255 > content.length && content.length > 0) && <button className='form_divs chat_submit' type="submit">Send</button>}
            </form>
        </div>
    ) : <div></div>);
};

export default DirectMessages;