
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { logout } from '../../store/session';
import './NavBar.css';
import defaultProfileImage from '../../default_profile_image.jpg';

const NavBar = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);
  const [ showMenu, setShowMenu ] = useState(false);

  const onClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu)
  };

  const onClick2 = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu)
    history.push(`/users/${currentUser.id}`);
  };

  const onLogout = async (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu)
    await dispatch(logout());
  };

  return (
    <nav className='navbar'>
      {currentUser && <div className='nav_div'>
        <div className='nav_divs_1'>
          <NavLink to='/' className='NavLink' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </div>
        <div className='nav_divs_2'>
          <NavLink to='/users' className='NavLink' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div>
        <div className='nav_divs_3'>
						<div className='nav_bar_user_info'>
								<img
                  className='nav_bar_user_img'
                  src={currentUser.profile_pic ? currentUser.profile_pic : defaultProfileImage}
                  alt='navbar profile'
                  onClick={e => onClick(e)}
                />
							{showMenu && (
								<div className='profile_menu'>
                  <div className='pic_name'>
                    <img
                      className='menu_img'
                      src={currentUser.profile_pic ? currentUser.profile_pic : defaultProfileImage}
                      alt='navbar profile'
                    />
										<div className='menu_name'>{currentUser.nickname ? currentUser.nickname : currentUser.full_name}</div>
                  </div>
										<div className="menu_item" onClick={e => onClick2(e)}>Account</div>
                    <div className='menu_item' onClick={e => onLogout(e)}>Log out</div>
								</div>
							)}
						</div>
					</div>
      </div>}
    </nav>
  );
};

export default NavBar;
