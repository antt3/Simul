import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (currentUser) {
    return <Redirect to='/' />;
  }

  return (
    <div className='form_div'>
      <form className='form' onSubmit={onLogin}>
        {errors.length > 0 &&<div className='form_errors'>
          {errors.map((error, ind) => (
            <div className='form_error' key={ind}>{error}</div>
          ))}
        </div>}
        <div className='form_divs'>
          <div className='form_label'><label htmlFor='email'>Email</label></div>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className='form_divs'>
          <div className='form_label'><label htmlFor='password'>Password</label></div>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <button className='form_divs form_submit' type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
