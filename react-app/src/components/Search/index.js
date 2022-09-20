import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from 'react-router-dom';

import * as dmReducer from '../../store/directMessages';
import * as channelsReducer from '../../store/channels';


import './Search.css';


const Search = () => {
    const currentUser = useSelector((state) => state.session.user);
    const directMessages = useSelector((state) => state.directMessages);
    const channels = useSelector((state) => state.channels);
    const dmsArray = Object.values(directMessages);
    const channelsArray = Object.values(channels);
    const { searchTerm } = useParams();
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState(searchTerm);
    const [searchedDMS, setSearchedDMS] = useState([]);
    const [searchedCMS, setSearchedCMS] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [searchedChannels, setSearchedChannels] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const response = await fetch('/api/users/');
          const responseData = await response.json();
          setUsers(responseData.users);
        }
        fetchData();
    }, []);

    useEffect(() => {
        (async() => {
            await dispatch(dmReducer.thunkGetMessages(currentUser.id));
            await dispatch(channelsReducer.thunkGetChannels());
        })();
    }, [dispatch, currentUser]);

    useEffect(() => {
		async function fetchData() {
			const response = await fetch(`/api/channel-messages/${search}`);
			const responseData = await response.json();
			setSearchedCMS(responseData.channel_messages);
		}

		fetchData();

        setSearchedDMS(dmsArray.filter(
            (dm) => dm.message.toLowerCase().includes(search.toLowerCase())
        ));

        setSearchedUsers(users.filter((user) => (
                user.full_name.toLowerCase().includes(search.toLowerCase()) ||
                user.nickname.toLowerCase().includes(search.toLowerCase())
            )
        ));

        setSearchedChannels(channelsArray.filter(
            (channel) => channel.toLowerCase().includes(search.toLowerCase())
        ));

	}, [search, dmsArray, users, channelsArray]);

    async function onSubmit(e) {
		e.preventDefault();
		async function fetchData() {
			const response = await fetch(`/api/channel-messages/${search}`);
			const responseData = await response.json();
			setSearchedCMS(responseData.channel_messages);
		}
		fetchData();
	}

    if (!currentUser) return <Redirect to="/splash" />;


    return (
        <div className="search-container">
			<form className="search-bar" onSubmit={onSubmit}>
				<input
					type="text"
					id="search"
					name="search"
					placeholder="Search Channels Or Messages"
					onChange={(e) => setSearch(e.target.value)}
				/>
                <button>Search</button>
			</form>
            {searchedUsers.length > 0 && (
				<div className='users_div'>
					<h2>Users: </h2>
					<div className="users_divs">{searchedUsers}</div>
				</div>
			)}
            {searchedChannels.length > 0 && (
				<div className='users_div'>
					<h2>Channels: </h2>
					<div className="users_divs">{searchedChannels}</div>
				</div>
			)}
			{searchedCMS.length > 0 && (
				<div className='dms_div'>
					<h2>Channel Messages: </h2>
					<div className="dms_messages">{searchedCMS}</div>
				</div>
			)}
            {searchedDMS.length > 0 && (
				<div className='dms_div'>
					<h2>Direct Messages: </h2>
					<div className="dms_messages">{searchedDMS}</div>
				</div>
			)}
		</div>
    );
};

export default Search;