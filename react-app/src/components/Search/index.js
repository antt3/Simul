import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from 'react-router-dom';

import * as dmReducer from '../../store/directMessages';
import * as channelsReducer from '../../store/channels';
import defaultProfileImage from '../../default_profile_image.jpg';

import '../DirectMessages/DirectMessages.css';
import '../ChannelChat/ChannelChat.css';
import './Search.css';


const Search = () => {
    const currentUser = useSelector((state) => state.session.user);
    const directMessages = useSelector((state) => state.directMessages);
    const channels = useSelector((state) => state.channels);
    const dmsArray = Object.values(directMessages);
    const channelsArray = Object.values(channels);
    const { searchedTerm } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    // const [users, setUsers] = useState([]);
    const [searchedDMS, setSearchedDMS] = useState([]);
    const [searchedCMS, setSearchedCMS] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [searchedChannels, setSearchedChannels] = useState([]);

    // useEffect(() => {
    //     async function fetchUsers() {
    //       const response = await fetch('/api/users/');
    //       const responseData = await response.json();
    //       setUsers(responseData.users);
    //     }
    //     fetchUsers();
    // }, []);

    useEffect(() => {
        (async() => {
            await dispatch(dmReducer.thunkGetMessages(currentUser.id));
            await dispatch(channelsReducer.thunkGetChannels());
        })();
    }, [dispatch, currentUser]);

    useEffect(() => {
		(async() => {

		    	const cmResponse = await fetch(`/api/channel-messages/${searchedTerm}`);
		    	const cmResponseData = await cmResponse.json();
		    	setSearchedCMS(cmResponseData.channel_messages);
            
                const usersResponse = await fetch('/api/users/');
                const usersResponseData = await usersResponse.json();
                const users = usersResponseData.users;

                setSearchedDMS(dmsArray.filter(
                    (dm) => dm.message.toLowerCase().includes(searchedTerm.toLowerCase())
                ));
            
                setSearchedUsers(users.filter((user) => (
                        user.full_name.toLowerCase().includes(searchedTerm.toLowerCase()) ||
                        user.nickname.toLowerCase().includes(searchedTerm.toLowerCase())
                    )
                ));
            
                setSearchedChannels(channelsArray.filter(
                    (channel) => channel.title.toLowerCase().includes(searchedTerm.toLowerCase())
                ));
        })();
	}, [searchedTerm]);

    const onClickUser = (e, user) => {
        e.stopPropagation();
        history.push(`/users/${user.id}`);
    };

    const onClickChannel = (e, channel) => {
        e.stopPropagation();
        history.push(`/channels/${channel.id}`);
    };

    const onClickDM = (e, user) => {
        e.stopPropagation();
        history.push(`/direct-messages/${user.id}`);
    };

    const createdAt = (timestamp) => {
        return timestamp.split('.')[0];
    }

    if (!currentUser) return <Redirect to="/splash" />;


    return (
        <div className="search-container">

            {searchedChannels.length > 0 ? (
				<div className='users_div'>
					<h1>Channels: </h1>
					<div className="users_divs">
                        {searchedChannels.map((channel, ind) => (
                            <div className='user_div search_ch' onClick={(e) => onClickChannel(e, channel)} key={ind}>
                                {channel.title}
                            </div>
                        ))}
                    </div>
				</div>
			) : (
                <div className='users_div'>
					<h1>Channels: </h1>
					<div className="users_divs">
                        <div className='user_div'>
                                No Results
                        </div>
                    </div>
                </div>
            )}

            {searchedUsers.length > 0 ? (
				<div className='users_div'>
					<h1>Users: </h1>
					<div className="users_divs">
                        {searchedUsers.map((user, ind) => (
                            <div className='dm_pic_name' key={ind}>
                                <img
                                    className='dm_menu_img dm_chat_img'
                                    onClick={(e) => onClickUser(e, user)}
                                    src={user.profile_pic ? user.profile_pic : defaultProfileImage}
                                    alt='navbar profile'
                                />
                                <div className='dm_chat_tm'>
                                    <div
                                        onClick={(e) => onClickUser(e, user)}
                                        className='dm_user_name'
                                        id='search_name'>
                                            {user.full_name.toLowerCase().includes(searchedTerm.toLowerCase()) ? user.full_name : user.nickname}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
				</div>
			) : (
                <div className='users_div'>
					<h1>Users: </h1>
					<div className="users_divs">
                        <div className='user_div'>
                                No Results
                        </div>
                    </div>
                </div>
            )}

			{searchedCMS.length > 0 ? (
				<div className='dms_div'>
					<h1>Channel Messages: </h1>
					<div className="dms_messages">
                        {searchedCMS.map((cm, ind) => (
                            <div className='message_div' key={ind}>
                                <div className='pic_name'>
                                    <img
                                        className='menu_img chat_img'
                                        onClick={(e) => onClickUser(e, cm.user)}
                                        src={cm.user.profile_pic ? cm.user.profile_pic : defaultProfileImage}
                                        alt='navbar profile'
                                    />
                                    <div className='chat_tm'>
                                        <div className='timestamp'>{createdAt(cm.created_at)}</div>
                                        <div
                                            onClick={(e) => onClickUser(e, cm.user)}
                                            className='user_name'>
                                                {`${cm.user.nickname ? cm.user.nickname : cm.user.full_name}:`}
                                        </div>
                                    </div>
                                </div>
                                <div className='message_content search_dm' onClick={(e) => onClickChannel(e, cm.channel)}>
                                    {`${cm.message}`} { cm.edited ? <p className="message_edited">(edited)</p> : <></> }
                                </div>
                            </div>
                        ))}
                    </div>
				</div>
			) : (
                <div className='users_div'>
					<h1>Channel Messages: </h1>
					<div className="users_divs">
                        <div className='user_div'>
                                No Results
                        </div>
                    </div>
                </div>
            )}
            {searchedDMS.length > 0 ? (
				<div className='dms_div'>
					<h1>Direct Messages: </h1>
					<div className="dms_messages">
                        {searchedDMS.map((dm, ind) => (
                            <div className='message_div' key={ind}>
                                <div className='pic_name'>
                                    <img
                                        className='menu_img chat_img'
                                        onClick={(e) => onClickUser(e, dm.user)}
                                        src={dm.user.profile_pic ? dm.user.profile_pic : defaultProfileImage}
                                        alt='navbar profile'
                                    />
                                    <div className='chat_tm'>
                                        <div className='timestamp'>{createdAt(dm.created_at)}</div>
                                        <div
                                            onClick={(e) => onClickUser(e, dm.user)}
                                            className='user_name'>
                                                {`${dm.user.nickname ? dm.user.nickname : dm.user.full_name}:`}
                                        </div>
                                    </div>
                                </div>
                                <div className='message_content search_dm' onClick={(e) => onClickDM(e, dm.user)}>
                                    {`${dm.message}`} { dm.edited ? <p className="message_edited">(edited)</p> : <></> }
                                </div>
                            </div>
                        ))}
                    </div>
				</div>
			) : (
                <div className='users_div'>
					<h1>Direct Messages: </h1>
					<div className="users_divs">
                        <div className='user_div'>
                                No Results
                        </div>
                    </div>
                </div>
            )}
		</div>
    );
};

export default Search;