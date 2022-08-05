
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector} from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

const NavBar = () => {
  const currentUser = useSelector((state) => state.session.user);
  
  return (
    <nav>
      {currentUser ? <div className='nav_div'>
        <div className='navlink_divs'>
          <NavLink to='/' className='NavLink' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </div>
        <div className='navlink_divs'>
          <NavLink to='/users' className='NavLink' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div>
        <div>
          <LogoutButton />
        </div>
      </div> : <div></div>}
    </nav>
  );
}

export default NavBar;
