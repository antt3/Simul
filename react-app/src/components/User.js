import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
    <ul className='content'>
      <li>
        <strong>User Id: </strong> {userId}
      </li>
      <li>
        <strong>Email: </strong> {user.email}
      </li>
      <li>
        <strong>Full Name: </strong> {user.full_name}
      </li>
      <li>
        <strong>Nickname: </strong> {user.nickname}
      </li>
      <li>
        <strong>Bio: </strong> {user.bio}
      </li>
    </ul>
  );
}
export default User;
