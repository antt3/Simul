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
        <div className="search-container">
			<form className="search-bar" onSubmit={onSubmit}>
				<i class="search-icon fa fa-search"></i>
				<input
					type="text"
					id="search"
					name="search"
					placeholder="Artists, songs, or playlists"
					onChange={(e) => setSearch(e.target.value)}
				/>
				{/* <button>Search</button> */}
			</form>
			{resultsArray.length > 0 && (
				<>
					<h2>Playlists: </h2>
					<div className="chan-mes-container">{searchResults}</div>
				</>
			)}
			{searchSongs.length > 0 && (
				<>
					<h2>Songs: </h2>
					<table className="search-table">
						<thead>
							<tr className="border-white">
								<th className="search-song-number">#</th>
								<th className="">Chanels</th>
								<th className="">DIrect Messages</th>
								<th className=""></th>
							</tr>
						</thead>
						<tbody>{SearchResults}</tbody>
					</table>
				</>
			)}
		</div>
    );
};

export default Search;