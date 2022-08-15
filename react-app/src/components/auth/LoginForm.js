import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import logo from '../../logo.png';
import '../NavBar/NavBar.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstSubmit, setFirstSubmit] = useState(false);
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  const handleDemo = () => {
		return dispatch(sessionActions.demoLogin());
	}

  useEffect(() => {
    const errors = [];
    if (!email) errors.push('An email is required.');
    if (!validateEmail(email)) errors.push('Must be a valid email address.');
    if (email.length > 50) errors.push('Email length must be under 50 characters.');
    if (password.length < 7) errors.push('Password must be more than 6 characters.');
    if (password.length > 50) errors.push('Password must be under 50 characters.');

    setErrors(errors);
  }, [email, password])

  const onLogin = async (e) => {
    e.preventDefault();
    setFirstSubmit(true);

    if (errors.length === 0) {
      const data = await dispatch(sessionActions.login(email, password));

      if (data) {
        setErrors(data);
      };
    };
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
    <div className='form_div logged_out'>
      <div className='website'>
        <img src={logo} alt='Simul'></img>
        <p style={{color: "black"}}>simul</p>
      </div>
      <div className='devlinks_div'>
        <a href='https://github.com/antt3' target="_blank" rel='noreferrer'>Github</a>
        <a href='https://www.linkedin.com/in/anthony-t3/' target="_blank" rel='noreferrer'>LinkedIn</a>
      </div>
      <p style={{color: "black"}} className='form_action'>Sign in to Simul</p>
      <form className='form' onSubmit={onLogin}>
        {(errors.length > 0 && firstSubmit) && <div className='form_errors'>
          {errors.map((error, ind) => (
            <div className='form_error' key={ind}>{error}</div>
          ))}
        </div>}
        <div className='form_divs'>
          <div className='form_label'><label style={{color: "black"}} htmlFor='email'>Email</label></div>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className='form_divs'>
          <div className='form_label'><label style={{color: "black"}} htmlFor='password'>Password</label></div>
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
          <p style={{color: "black"}} className='form_link_p'>New to Simul?</p>
          <p style={{color: "black"}}><NavLink to='/sign-up' style={{color: "black"}} className='NavLink' exact={true} activeClassName='active'>
            Sign Up
          </NavLink></p>
        </div>
        <div className='navlink_divs form_link'>
          <p style={{color: "black"}} className='form_link_p'>Or skip sign in and use the demo login!</p>
          <p style={{color: "black"}} className='nav_p NavLink' onClick={handleDemo}>Demo Login</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
