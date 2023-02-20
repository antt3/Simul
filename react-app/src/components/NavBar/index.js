
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';

import { logout } from '../../store/session';

import './NavBar.css';
import '../../responsive.css';
import defaultProfileImage from '../../default_profile_image.jpg';

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);
  const [ showMenu, setShowMenu ] = useState(false);
  const [ search, setSearch ] = useState('');


  async function onSubmit(e) {
		e.preventDefault();
		history.push(`/search/${search}`);
	}

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

  const displayName = (user) => {
    if (user.nickname) {
      if (user.nickname.length > 13) {
        return user.nickname.slice(0, 13) + '...';
      } else {
        return user.nickname;
      }
    } else {
      if (user.full_name.length > 13) {
        return user.full_name.slice(0, 13) + '...';
      } else {
        return user.full_name;
      }
    }
  };

  if (currentUser) {
    return ( <nav className='navbar'>
      <div className='nav_div'>
        <div className='nav_divs_1'>
          <form className="search_bar" onSubmit={onSubmit}>
				  <input
				  	type="text"
				  	id="search"
				  	name="search"
				  	placeholder="Search Channels, Users, and Messages"
				  	onChange={(e) => setSearch(e.target.value)}
				  />
          <button>Search</button>
			</form>
        </div>
        <div className='nav_divs_3'>
          <NavLink to='/users' className='nav_c' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div>
        <div className='nav_divs_4'>
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
										<div className='menu_name'>{displayName(currentUser)}</div>
                  </div>
									<div className="menu_item" onClick={e => onClick2(e)}>Account</div>
                  <div className='menu_item m_i_2' onClick={e => onLogout(e)}>Log out</div>
								</div>
							)}
						</div>
					</div>
      </div>
    </nav> );
  } else {
    return <></>
  }
};

export default NavBar;
