import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import * as sessionActions from '../store/session';
import './NavBar/NavBar.css';

const SplashPage = () => {
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const handleDemo = () => {
		return dispatch(sessionActions.demoLogin());
    };

    if (currentUser) {
        return <Redirect to='/' />;
      }

    return (
        <div className='logged_out'>
            <h1 style={{color: "black"}}>Welcome to Simul</h1>
            <h3 style={{color: "black"}}>Simul is a Slack clone featuring Channels, Channel Messages with Live Chat, and User Profiles.</h3>
            <h3 style={{color: "black"}}>Simul uses Python Flask backend, a Postgresql database, and a JavaScrypt React/Redux Frontend.</h3>
            <h3 style={{color: "black"}}>To access the site you can sign up, sign in, or use a demo login.</h3>
            <div className='navlink_divs form_link'>
                <p style={{color: "black"}}><NavLink to='/sign-up' style={{color: "black"}} className='NavLink' exact={true} activeClassName='active'>
                    Sign Up
                </NavLink></p>
                <p style={{color: "black"}}><NavLink to='/login' style={{color: "black"}} className='NavLink' exact={true} activeClassName='active'>
                    Sign in
                </NavLink></p>
                <p style={{color: "black"}} className='nav_p NavLink' onClick={handleDemo}>Demo Login</p>
            </div>
        </div>
    );
};

export default SplashPage;