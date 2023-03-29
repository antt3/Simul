import React from 'react';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import defaultProfileImage from '../default_profile_image.jpg';

import './Profiles.css';
import './Search/Search.css';

function UsersList() {
  const history = useHistory();
  const usersObj = useSelector((state) => state.users);
  const users = Object.values(usersObj);

  // Handles Username Click
  const onClickUser = (e, user) => {
    e.stopPropagation();
    history.push(`/users/${user.id}`);
};

  return (
    <div className='users_list_div'>
      {users.length > 0 ? (
        <div className='users_div'>
          <h1>Users: </h1>
          <div className="users_divs">
            {users.map((user, ind) => (
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
                    className='dm_user_name' id='search_name'>
                      {user.nickname ? user.nickname : user.full_name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default UsersList;
