import React from 'react';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import CreateChannelModal from './Modals/CreateChannelModal';
import DeleteChannelModal from './Modals/DeleteChannelModal';
import EditChannelModal from './Modals/EditChannelModal';

const AllChannels = () => {
    const currentUser = useSelector((state) => state.session.user);
    const channels = useSelector((state) => state.channels);
    const channelsArr = Object.values(channels);

    console.log('----------currentUser: ', currentUser, '-------');
    console.log('----------Channels: ', channels, '-------');
    console.log('----------channelsArr: ', channelsArr, '-------');

    if (!currentUser) return <Redirect to="/login" />;

    return (
        <>
            <h1>Channels</h1>
                <CreateChannelModal currentUser={currentUser} />
                {channels && channelsArr.map((channel) => 
                    <div className='channel' key={channel.id}>
                        <div># {channel.title}: {channel.description}</div>
                        <EditChannelModal channel={channel} />
                        <DeleteChannelModal channel={channel} />
                    </div>
                )}
        </>
    );
};

export default AllChannels;