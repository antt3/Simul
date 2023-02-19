import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import defaultProfileImage from '../default_profile_image.jpg';
import './Profiles.css';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  // Get profile information
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

  // If there is no user load nothing
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
        <p>{user.nickname ? user.nickname : user.full_name}</p>
      </div>
      <div>
        <p>Contact Information</p>
        <p>Email</p>
        <p>{user.email}</p>
      </div>
      <div>
        <p>About me</p>
        <p>{user.bio}</p>
      </div>
    </div>
  );
}
export default User;
