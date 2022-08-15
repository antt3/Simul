import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import defaultProfileImage from '../default_profile_image.jpg';
import './Profiles.css';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div className='content profile_div'>
      <img
        className='user_prof_img'
        src={user.profile_pic ? user.profile_pic : defaultProfileImage}
        alt='Profile'
      />
      <div>
        <strong>Email:</strong>
        <div>{user.email}</div>
      </div>
      <div>
        <strong>Full Name:</strong>
        <div>{user.full_name}</div>
      </div>
      <div>
        <strong>Nickname:</strong>
        <div>{user.nickname}</div>
      </div>
      <div>
        <strong>Bio:</strong>
        <div>{user.bio}</div>
      </div>
    </div>
  );
}
export default User;
