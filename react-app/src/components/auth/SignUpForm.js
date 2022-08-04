import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [team, setTeam] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  useEffect(() => {
    const errors = [];
    if (!email) errors.push('An email is required.');
    if (!validateEmail(email)) errors.push('Must be a valid email address.');
    if (email.length > 50) errors.push('Email length must be under 50 characters.');
    if (!fullName) errors.push('Your name is required.');
    if (fullName.length > 100) errors.push('Your name must be under 100 character.');
    if (!team) errors.push('Team/Company name is required.');
    if (team.length > 100) errors.push('Team/Company name must be under 100 characters.');
    if (!password) errors.push('A password is required.');
    if (password.length < 7) errors.push('Password must be more than 6 characters.');
    if (password.length > 50) errors.push('Password must be under 50 characters.');
    if (!repeatPassword) errors.push('Please repeat the password.');
    if (password !== repeatPassword) errors.push('Password and repeated password must match.');


    setErrors(errors);
  }, [email, fullName, team, password, repeatPassword])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (errors.length === 0) {
      const data = await dispatch(signUp(email, fullName, team, password));
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

  const updateTeam = (e) => {
    setTeam(e.target.value);
  }

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
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Full Name</label>
        <input
          type='text'
          name='fullName'
          onChange={updateFullName}
          value={fullName}
        ></input>
      </div>
      <div>
        <label>Team/Company Name</label>
        <input
          type='text'
          name='team'
          onChange={updateTeam}
          value={team}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
