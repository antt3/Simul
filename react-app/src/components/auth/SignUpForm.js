import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';

import logo from "../../logo.png";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
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
    if (!fullName) errors.push('Your name is required.');
    if (fullName.length > 100) errors.push('Your name must be under 100 character.');
    if (password.length < 7) errors.push('Password must be more than 6 characters.');
    if (password.length > 50) errors.push('Password must be under 50 characters.');
    if (!repeatPassword) errors.push('Please repeat the password.');
    if (password !== repeatPassword) errors.push('Password and repeated password must match.');


    setErrors(errors);
  }, [email, fullName, password, repeatPassword])

  const onSignUp = async (e) => {
    e.preventDefault();
    setFirstSubmit(true);

    if (!errors.length) {
      const data = await dispatch(sessionActions.signUp(email, fullName, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateFullName = (e) => {
    setFullName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (currentUser) {
    return <Redirect to='/' />;
  }

  return (
    <div className='form_div logged_out'>
      <div className='website'>
        <img src={logo} alt='Simul'></img>
        <p>simul</p>
      </div>
      <div className='devlinks_div'>
        <a href='https://github.com/antt3' target="_blank" rel='noreferrer'>Github</a>
        <a href='https://www.linkedin.com/in/anthony-t3/' target="_blank" rel='noreferrer'>LinkedIn</a>
      </div>
      <p className='form_action'>Sign up for Simul</p>
      <form className='form' onSubmit={onSignUp}>
        {(errors.length > 0 && firstSubmit) && <div className='form_errors'>
          {errors.map((error, ind) => (
            <div className='form_error' key={ind}>{error}</div>
          ))}
        </div>}
        <div className='form_divs'>
          <div className='form_label'><label>Email</label></div>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            placeholder='Email'
            value={email}
          ></input>
        </div>
        <div className='form_divs'>
          <div className='form_label'><label>Full Name</label></div>
          <input
            type='text'
            name='fullName'
            onChange={updateFullName}
            placeholder='Full Name'
            value={fullName}
          ></input>
        </div>
        <div className='form_divs'>
          <div className='form_label'><label>Password</label></div>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            placeholder='Password'
            value={password}
          ></input>
        </div>
        <div className='form_divs'>
          <div className='form_label'><label>Repeat Password</label></div>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            placeholder='Repeated Password'
            value={repeatPassword}
          ></input>
        </div>
        <button className='form_divs form_submit' type='submit'>Sign Up</button>
      </form>
      <div className='form_links'>
        <div className='navlink_divs form_link'>
          <p>Already have a Simul account?</p>
          <p><NavLink to='/login' className='NavLink' exact={true} activeClassName='active'>
            Sign in
          </NavLink></p>
        </div>
        <div className='navlink_divs form_link'>
          <p>Or skip sign up and use the demo login!</p>
          <p className='nav_p NavLink' onClick={handleDemo}>Demo Login</p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
