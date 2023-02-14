import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import * as sessionActions from '../store/session';
import logo from '../logo.png';
import './NavBar/NavBar.css';

const SplashPage = () => {
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    // Demo Login Handler
    const handleDemo = () => {
		return dispatch(sessionActions.demoLogin());
    };

    // Redirect If Signed in
    if (currentUser) {
        return <Redirect to='/' />;
    }

    return (
        <div className='logged_out splash'>
            <div className='website'>
                <img src={logo} alt='Simul'></img>
                <p style={{color: "black"}} id='logo_p'>simul</p>
            </div>
            <div className='devlinks_div'>
                <a href="https://github.com/antt3" target="_blank" rel='noreferrer'><img className='dev_link_gh' src='https://t3-simul-bucket.s3.us-west-1.amazonaws.com/github-transparent.png' alt='Github'></img></a>
                <a href="https://www.linkedin.com/in/anthony-t3" target="_blank" rel='noreferrer'><img className='dev_link_li' src='https://t3-simul-bucket.s3.us-west-1.amazonaws.com/linkedin-tranparent.png' alt='LinkedIn'></img></a>
            </div>
            <h1 style={{color: "black"}}>Welcome to Simul</h1>
            <h3 style={{color: "black"}}>Simul is a Slack clone featuring Channels, Channel Messages and Direct Messages with Live Chat, and User Profiles.</h3>
            <h3 style={{color: "black"}}>Simul uses a JavaScript React/Redux frontend, a Python Flask/SQLAlchemy backend API, and connects to a PostgreSQL and AWS S3 database.</h3>
            <h3 style={{color: "black"}}>To access the site you can sign up, sign in, or use a demo login.</h3>
            <div className='navlink_divs form_link' id='splash_links'>
                <p><NavLink to='/sign-up' className='NavLink' id='nav_p' exact={true} activeClassName='active'>
                    Sign Up
                </NavLink></p>
                <p><NavLink to='/login' className='NavLink' id='nav_p' exact={true} activeClassName='active'>
                    Sign In
                </NavLink></p>
                <p className='NavLink' id='nav_p' onClick={handleDemo}>Demo Login</p>
            </div>
        </div>
    );
};

export default SplashPage;