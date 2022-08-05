import React from 'react';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

const AllChannels = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const channels = useSelector((state) => state?.channels);
    const channelsArr = Object.values(channels);
    console.log('----------Channels: ', channels, '-------');
    console.log('----------channelsArr: ', channelsArr, '-------');

    if (!sessionUser) return <Redirect to="/login" />;

    return (
        <>
            <h1>Channels:</h1>
            <ul>

            </ul>
        </>
    );
};

export default AllChannels;