import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

const AllChannels = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const channels = useSelector((state) => state.channels);
    const channelsArr = Object.values(channels);

    console.log('----------sessionUser: ', sessionUser, '-------');
    console.log('----------Channels: ', channels, '-------');
    console.log('----------channelsArr: ', channelsArr, '-------');

    if (!sessionUser) return <Redirect to="/login" />;

    return (
        <>
            <h1>Channels:</h1>
            <ul>
                {channels && channelsArr.map((channel) => 
                    <li key={channel.id}># {channel.title}: {channel.description}</li>

                )}
            </ul>
        </>
    );
};

export default AllChannels;