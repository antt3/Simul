import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';
import CreateChannelModal from './Modals/CreateChannelModal';
import DeleteChannelModal from './Modals/DeleteChannelModal';
import EditChannelModal from './Modals/EditChannelModal';
import * as channelsReducer from '../../store/channels';
import * as dmReducer from '../../store/directMessages';
import * as usersReducer from '../../store/users';
import { io } from 'socket.io-client';
import './AllChannels.css';

let socket;


const AllChannels = () => {
    const currentUser = useSelector((state) => state.session.user);
    const channels = useSelector((state) => state.channels);
    const users = useSelector((state) => state.users);
    const channelsArr = Object.values(channels);
    const history = useHistory();
    const dispatch = useDispatch();

    // console.log('----------currentUser: ', currentUser, '-------');
    // console.log('----------Channels: ', channels, '-------');
    // console.log('----------channelsArr: ', channelsArr, '-------');

    const onClick = (e, channel) => {
        e.stopPropagation();
        history.push(`/channels/${channel.id}`)
    };

    const onClick2 = (e, user) => {
        e.stopPropagation();
        history.push(`/direct-messages/${user.id}`)
    };

    useEffect(() => {
        (async() => {
          await dispatch(channelsReducer.thunkGetChannels());
          await dispatch(usersReducer.thunkGetUsers());
        })()
    }, [dispatch]);
    

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

    if (!currentUser) return <Redirect to="/splash" />;


    return (
        <div className='sidebar sidebar_main_div'>
            <div className='nav_dev_links'>
                <a href='https://github.com/antt3' target="_blank" rel='noreferrer'>Github</a>
                <a href='https://www.linkedin.com/in/anthony-t3/' target="_blank" rel='noreferrer'>LinkedIn</a>
            </div>
            <div className='top_channels'>
                <h1>Channels</h1>
                <CreateChannelModal socket={socket} currentUser={currentUser} />
            </div>
            {channels && channelsArr.map((channel) => 
                <div className='channel' key={channel.id}>
                    <div className='channel_title' onClick={(e)=> onClick(e, channel)}># {channel.title}</div>
                    { currentUser.id === channel.user.id ?
                        <div className='edit_delete_channel'>
                            <EditChannelModal socket={socket} channel={channel} />
                            <DeleteChannelModal socket={socket} channel={channel} />
                        </div>
                    : <div></div> }
                </div>
            )}
            <div className='top_channels'>
                <h1>Direct Messages</h1>
            </div>
            {users ? ( Object.values(users).map((user) => 
                <div className='channel' key={user.id}>
                    <div
                        className='channel_title'
                        onClick={(e)=> onClick2(e, user)}>
                            {`${user.nickname ? user.nickname : user.full_name}`}
                    </div>
                </div>
            )) : <div></div>}
        </div>
    );
};


export default AllChannels;