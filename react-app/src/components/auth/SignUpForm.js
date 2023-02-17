import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import logo from "../../logo.png";
import '../NavBar/NavBar.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [jpg, setJPG] = useState(null);
  const [isJPG, setIsJPG] = useState(true);
  const [jpgLoading, setJPGLoading] = useState(false);
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstSubmit, setFirstSubmit] = useState(false);
  const currentUser = useSelector(state => state.session.user);
  const hiddenFileInput = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  // Validate Email With Regex
  const validateEmail = (email) => {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // const validateImg = (url) => {
  //   let re = /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i;
  //   return re.test(url);
  // }

  // Demo Login Handler
  const handleDemo = () => {
		return dispatch(sessionActions.demoLogin());
	}

  // Sign Up Validators
  useEffect(() => {
    const errors = [];
    if (!email) errors.push('An email is required.');
    if (!validateEmail(email)) errors.push('Must be a valid email address.');
    if (email.length > 50) errors.push('Email length must be under 50 characters.');
    if (!fullName) errors.push('Your name is required.');
    if (fullName.length > 100) errors.push('Your name must be under 100 characters.');
    if (nickname.length > 40) errors.push('Your nickname must be under 40 characters.');
    if (!isJPG && jpg) errors.push('Your profile photo must be a jpg.');
    if (!jpg) errors.push('Your profile photo is required.');
    if (bio.length > 255) errors.push('Bio must be under 255 characters.');
    if (password.length < 7) errors.push('Password must be more than 6 characters.');
    if (password.length > 50) errors.push('Password must be under 50 characters.');
    if (!repeatPassword) errors.push('Please repeat the password.');
    if (password !== repeatPassword) errors.push('Password and repeated password must match.');

    setErrors(errors);
  }, [email, fullName, password, repeatPassword, nickname, bio, isJPG, jpg]);

  // Handle Image Upload
  const handleUpload = e => {
    e.preventDefault();
    setIsJPG(true);
    hiddenFileInput.current.click();
  };

  // Handle Sign Up
  const onSignUp = async (e) => {
    e.preventDefault();
    setFirstSubmit(true);

    if (!errors.length) {
      const formData = new FormData();
      formData.append("jpg", jpg);

      setJPGLoading(true);
      const res = await fetch('/api/auth/jpg', {
          method: "POST",
          body: formData
      });
      if (res.ok) {
        const jsonRes = await res.json();
        setJPGLoading(false);
        // console.log('--------------jsonRes: ', jsonRes, '--------------------------');
        const data = await dispatch(sessionActions.signUp(
          email,
          fullName,
          nickname,
          jsonRes.source,
          bio,
          password
        ));

        if (data) setErrors(data);

      } else {
        setJPGLoading(false);
        setIsJPG(false);
      }
    }
  };

  // Demo Login Handler
  const onClick = (e) => {
    e.stopPropagation();
    history.push("/splash")
  };

  const updateFullName = (e) => {
    setFullName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateNickname = (e) => {
    setNickname(e.target.value);
  };

  const updateBio = (e) => {
    setBio(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
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
        <a href="https://github.com/antt3" target="_blank" rel='noreferrer'><img className='dev_link_gh' src='https://t3-simul-bucket.s3.us-west-1.amazonaws.com/github-transparent.png' alt='Github'></img></a>
        <a href="https://www.linkedin.com/in/anthony-t3" target="_blank" rel='noreferrer'><img className='dev_link_li' src='https://t3-simul-bucket.s3.us-west-1.amazonaws.com/linkedin-tranparent.png' alt='LinkedIn'></img></a>
      </div>
      <p style={{color: "black"}} className='form_action'>Sign up for Simul</p>
      <form className='form' onSubmit={onSignUp}>
        {(errors.length > 0 && firstSubmit) && <div className='form_errors'>
          {errors.map((error, ind) => (
            <div className='form_error' key={ind}>{error}</div>
          ))}
        </div>}
        <div className='form_divs'>
          <div className='form_label'><label style={{color: "black"}}>Email</label></div>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            placeholder='Email'
            value={email}
          ></input>
        </div>
        <div className='form_divs'>
          <div className='form_label'><label style={{color: "black"}}>Full Name</label></div>
          <input
            type='text'
            name='fullName'
            onChange={updateFullName}
            placeholder='Full Name'
            value={fullName}
          ></input>
        </div>
        <div className='form_divs'>
          <div className='form_label'><label style={{color: "black"}}>Nickname</label></div>
          <input
            type='text'
            name='nickname'
            onChange={updateNickname}
            placeholder='(Optional) Nickname'
            value={nickname}
          ></input>
        </div>
        <div className='form_divs'>
        <div className='form_label'><label htmlFor='source' style={{color: "black"}}>Profile Photo</label></div>
          <button className='form_upload_btn' onClick={(e)=> handleUpload(e)}>
            Upload jpg
          </button>
          <input
              name='source'
              type='file'
              accept=''
              ref={hiddenFileInput}
              style={{ display: 'none' }}
              onChange={(e) => setJPG(e.target.files[0])}
          />
        </div>
        {jpg && <p className='form_p' style={{color: "black"}}>{jpg.name}</p>}
        <div className='form_divs'>
          <div className='form_label'><label style={{color: "black"}}>Bio</label></div>
          <textarea
            type='text'
            name='bio'
            style={{color: "black"}}
            className='signup_textarea'
            onChange={updateBio}
            placeholder='(Optional) Bio'
            value={bio}
          />
        </div>
        <div className='form_divs'>
          <div className='form_label'><label style={{color: "black"}}>Password</label></div>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            placeholder='Password'
            value={password}
          ></input>
        </div>
        <div className='form_divs'>
          <div className='form_label'><label style={{color: "black"}}>Repeat Password</label></div>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            placeholder='Repeated Password'
            value={repeatPassword}
          ></input>
        </div>
        <button className='form_divs form_submit' type='submit'>Sign Up</button>
        {(jpgLoading) && <p className='form_divs' style={{color: "black"}}>Creating Your Account   <img src='https://i.gifer.com/ZZ5H.gif' alt='Uploading' className='uploading_img'></img></p>}
      </form>
      <div className='form_links'>
        <div className='navlink_divs form_link'>
          <p style={{color: "black"}}>Already have a Simul account?</p>
          <p><NavLink to='/login' className='NavLink' id='nav_p' exact={true} activeClassName='active'>
            Sign In
          </NavLink></p>
        </div>
        <div className='navlink_divs form_link'>
          <p style={{color: "black"}}>Or skip sign up and use the demo login!</p>
          <p className='NavLink' id='nav_p' onClick={handleDemo}>Demo Login</p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
