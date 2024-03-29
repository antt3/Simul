import React, { useState, useEffect } from "react";
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';

import { useChannel } from '../../context/channelContext';
import DeleteMessageModal from './Modals/DeleteMessageModal';
import EditMessageModal from './Modals/EditMessageModal';
import * as dmReducer from '../../store/directMessages';
import * as channelsReducer from '../../store/channels';
import defaultProfileImage from '../../default_profile_image.jpg';

import './DirectMessages.css';
import '../ChannelChat/ChannelChat.css';
import '../../responsive.css';

let socket;


const DirectMessages = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { refId } = useParams();
    const currentUser = useSelector((state) => state.session.user);
    const allMessages = useSelector((state) => state.directMessages);
    // console.log('------------------.--.- All Messages: ', allMessages, '--------.-.-.-.-.-.-')
    const [content, setContent] = useState("");
    const [ref, setRef] = useState(null);
    // if (ref) console.log('------------------.--.- Ref Nickname: ', ref[0].nickname, '--------.-.-.-.-.-.-')
    // console.log("-----------------refId", refId, "-----------------------");

    const { setCurrentChannel } = useChannel();

    useEffect(()=> {
        setCurrentChannel([ "DM", +refId ]);
    }, [ setCurrentChannel, refId ]);

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
        socket.on("chat", async(res) => {
            // when we recieve a chat, add it into our messages array in state
            // console.log('-------Add/Edit Socket Res: ', res, '----------');
            // await dispatch(channelMessagesReducer.actionAddEditMessage(res));
            if (res === "channel") {
                await dispatch(channelsReducer.thunkGetChannels());
                await dispatch(dmReducer.thunkGetMessages(currentUser.id));
            } else {
                await dispatch(dmReducer.thunkGetMessages(currentUser.id));
                await dispatch(channelsReducer.thunkGetChannels());
            }
        })

        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [dispatch, currentUser])

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


    return ((currentUser && allMessages && ref && ref[0]) ? (
        <div className='content'>
                <div className='dm_pic_name'>
                    <img
                        className='dm_menu_img dm_chat_img'
                        onClick={(e) => onClick(e, ref[0].id)}
                        src={ref[0].profile_pic ? ref[0].profile_pic : defaultProfileImage}
                        alt='navbar profile'
                    />
                    <div className='dm_chat_tm'>
                        <div
                            onClick={(e) => onClick(e, ref[0].id)}
                            className='dm_user_name'>
                                {`${ref[0].nickname ? ref[0].nickname : ref[0].full_name} ${currentUser.id === ref[0].id ? '(you)' : ''}`}
                        </div>
                    </div>
                </div>
                { currentUser.id !== ref[0].id ? 
                    <div className='title_div'>
                        This is the very beginning of your direct message history with @{`${ref[0].nickname ? ref[0].nickname : ref[0].full_name}`}. Only the two of you are in this conversation.
                    </div>
                :
                    <div className='title_div'>
                        This is your space. Draft messages, list your to-dos, or keep links and files handy. You can also talk to yourself here, but please bear in mind you'll have to supply both sides of the conversation.
                    </div>
                }
            { currentUser.id !== ref[0].id ? <div className="all_messages">
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
                            <div className='message_content'>{`${message.message}`} { message.edited ? <p className="message_edited">(edited)</p> : <></> }</div>
                            <div className='edit_delete_chat'>
                                {(message.user.id === currentUser.id) && <EditMessageModal message={message} socket={socket} />}
                                {(message.user.id === currentUser.id) && <DeleteMessageModal message={message} socket={socket} />}
                            </div>
                        </div>
                    : <></>
                ))}
            </div> : <div className="all_messages">
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
                            <div className='message_content'>{`${message.message}`} { message.edited ? <p className="message_edited">(edited)</p> : <></> }</div>
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