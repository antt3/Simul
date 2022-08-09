import React from 'react';
import { useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';
import CreateChannelModal from './Modals/CreateChannelModal';
import DeleteChannelModal from './Modals/DeleteChannelModal';
import EditChannelModal from './Modals/EditChannelModal';

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

    if (!currentUser) return <Redirect to="/login" />;

    return (
        <div className='sidebar'>
            <h1>Channels</h1>
                <CreateChannelModal currentUser={currentUser} />
                {channels && channelsArr.map((channel) => 
                    <div className='channel' key={channel.id}>
                        <div onClick={(e)=> onClick(e, channel)}># {channel.title}</div>
                        { currentUser.id === channel.userId && <EditChannelModal channel={channel} /> }
                        { currentUser.id === channel.userId && <DeleteChannelModal channel={channel} /> }
                        </div>
                )}
        </div>
    );
};

export default AllChannels;