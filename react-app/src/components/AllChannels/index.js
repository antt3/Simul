import React from 'react';
import { useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';
import CreateChannelModal from './Modals/CreateChannelModal';
import DeleteChannelModal from './Modals/DeleteChannelModal';
import EditChannelModal from './Modals/EditChannelModal';
import './AllChannels.css';

const AllChannels = () => {
    const currentUser = useSelector((state) => state.session.user);
    const channels = useSelector((state) => state.channels);
    const channelsArr = Object.values(channels);
    const history = useHistory();

    // console.log('----------currentUser: ', currentUser, '-------');
    // console.log('----------Channels: ', channels, '-------');
    // console.log('----------channelsArr: ', channelsArr, '-------');

    const onClick = (e, channel) => {
        e.stopPropagation();
        history.push(`/channels/${channel.id}`)
    };

    if (!currentUser) return <Redirect to="/splash" />;

    return (
        <div className='sidebar'>
            <div className='top_channels'>
                <h1>Channels</h1>
                <CreateChannelModal currentUser={currentUser} />
            </div>
            {channels && channelsArr.map((channel) => 
                <div className='channel' key={channel.id}>
                    <div onClick={(e)=> onClick(e, channel)}># {channel.title}</div>
                    { currentUser.id === channel.user.id ?
                        <div>
                            <EditChannelModal channel={channel} />
                            <DeleteChannelModal channel={channel} />
                        </div>
                    : <div></div> }
                </div>
            )}
        </div>
    );
};


export default AllChannels;