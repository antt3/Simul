import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ChannelChat = () => {
    const { channelId } = useParams();
    const currentUser = useSelector((state) => state.session.user)
    const channel = useSelector((state) => state.channels[channelId]);
    
    if (!currentUser) return <Redirect to="/login" />;

    return (
        <h1 className='content'>{channel?.title}: {channel?.description}</h1>
    );
};

export default ChannelChat;