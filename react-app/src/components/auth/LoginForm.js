import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink, useHistory } from 'react-router-dom';
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
  const history = useHistory();

  // Validate Email With Regex
  const validateEmail = (email) => {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Handle Splash Page Click
  const onClick = (e) => {
    e.stopPropagation();
    history.push("/splash")
  };

  // Demo Login Handler
  const handleDemo = () => {
		return dispatch(sessionActions.demoLogin());
	};

  // Login Validators
  useEffect(() => {
    const errors = [];
    if (!email) errors.push('An email is required.');
    if (!validateEmail(email)) errors.push('Must be a valid email address.');
    if (email.length > 50) errors.push('Email length must be under 50 characters.');
    if (password.length < 7) errors.push('Password must be more than 6 characters.');
    if (password.length > 50) errors.push('Password must be under 50 characters.');

    setErrors(errors);
  }, [email, password]);

  // Handle Login
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

  // Redirect If Signed In
  if (currentUser) {
    return <Redirect to='/' />;
  }

  return (
    <div className='form_div logged_out'>
      <div className='website'>
        <img className='website_s' onClick={e => onClick(e)} src={logo} alt='Simul'></img>
        <p className='website_s' onClick={e => onClick(e)} style={{color: "black"}} id='logo_p'>simul</p>
      </div>
      <div className='devlinks_div'>
        <a href="https://github.com/antt3" target="_blank" rel='noreferrer'><img className='dev_link_gh' src='https://cdn-icons-png.flaticon.com/512/25/25231.png' alt='Github'></img></a>
        <a href="https://www.linkedin.com/in/anthony-t3" target="_blank" rel='noreferrer'><img className='dev_link_li' src='https://upload.wikimedia.org/wikipedia/commons/0/06/Linkedin_circle_black-512.png' alt='LinkedIn'></img></a>
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
          <p><NavLink to='/sign-up' className='NavLink' id='nav_p' exact={true} activeClassName='active'>
            Sign Up
          </NavLink></p>
        </div>
        <div className='navlink_divs form_link'>
          <p style={{color: "black"}} className='form_link_p'>Or skip sign in and use the demo login!</p>
          <p className='NavLink' id='nav_p' onClick={handleDemo}>Demo Login</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
