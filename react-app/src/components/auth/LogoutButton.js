import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()

  const onLogout = async (e) => {
    e.stopPropagation();
    await dispatch(logout());
  };

  return (
    <li>
      <p className='NavLink' onClick={onLogout}>Logout</p>
    </li>
  )
};

export default LogoutButton;
