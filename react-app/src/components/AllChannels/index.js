import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import CreateChannelModal from './Modals/CreateChannelModal';

const AllChannels = () => {
    const dispatch = useDispatch();
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
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                )}
        </>
    );
};

export default AllChannels;