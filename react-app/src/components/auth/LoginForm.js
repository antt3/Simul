import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import logo from '../../logo.png';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleDemo = () => {
		return dispatch(sessionActions.demoLogin());
	}

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(sessionActions.login(email, password));
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
      <div className='website'>
        <img src={logo} alt='Simul'></img>
        <p>simul</p>
      </div>
      <p className='form_action'>Log in to Simul</p>
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
        <button className='form_divs form_submit' type='submit'>Log In</button>
      </form>
      <div className='form_links'>
        <div className='navlink_divs form_link'>
          <p>New to Simul?</p>
          <p><NavLink to='/sign-up' className='NavLink' exact={true} activeClassName='active'>
            Sign Up
          </NavLink></p>
        </div>
        <div className='navlink_divs form_link'>
          <p>Or skip signing up and use the demo login!</p>
          <p className='nav_p NavLink' onClick={handleDemo}>Demo Log In</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
