import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import * as dmReducer from '../../store/directMessages';
import * as channelsReducer from '../../store/channels';


import './Search.css';


const Search = () => {
    const currentUser = useSelector((state) => state.session.user);
    const directMessages = useSelector((state) => state.directMessages);
    const channels = useSelector((state) => state.channels);
    const dmsArray = Object.values(directMessages);
    const channelsArray = Object.values(channels);
    const [resultsArray, setResultsArray] = useState([]);
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        (async() => {
            await dispatch(dmReducer.thunkGetMessages(currentUser.id));
            await dispatch(channelsReducer.thunkGetChannels());
        })();
    }, [dispatch, currentUser]);

    useEffect(() => {
		async function fetchData() {
			const response = await fetch(`/api/direct-messages/${search}`);
			const responseData = await response.json();
			setResultsArray(responseData.direct_messages);
		}
		fetchData();
	}, [search]);

    async function onSubmit(e) {
		e.preventDefault();
		async function fetchData() {
			const response = await fetch(`/api/playlists/${search}`);
			const responseData = await response.json();
			setResultsArray(responseData.channel_messages);
		}
		fetchData();
	}

    return (
        <></>
    );
};

export default Search;