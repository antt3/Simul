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
        <div className='logged_out splash'>
            <h1 style={{color: "black"}}>Welcome to Simul</h1>
            <h3 style={{color: "black"}}>Simul is a Slack clone featuring Channels, Channel Messages with Live Chat, and User Profiles.</h3>
            <h3 style={{color: "black"}}>Simul uses Python Flask backend, a Postgresql database, and a JavaScrypt React/Redux frontend.</h3>
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