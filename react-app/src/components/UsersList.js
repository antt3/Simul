import React from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import './Profiles.css';

function UsersList() {
  const users = useSelector((state) => state.users);

  const userComponents = Object.values(users).map((user) => {
    return (
      <li key={user.id}>
        <NavLink
          className="NavLink"
          to={`/users/${user.id}`}>
            {`${user.nickname ? user.nickname : user.full_name}`}
        </NavLink>
      </li>
    );
  });

  return (
    <div className='content'>
      <h1>Users: </h1>
      <ul className='users_ul'>{userComponents}</ul>
    </div>
  );
}

export default UsersList;
