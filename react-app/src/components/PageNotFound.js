import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PageNotFound = () => {
    const currentUser = useSelector((state) => state.session.user)

    if (!currentUser) {
        return <Redirect to="/splash" />;
    } else {
        return <Redirect to="/channels/1" />
    }
};

export default PageNotFound;