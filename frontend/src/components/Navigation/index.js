import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

import ModalSignUp from '../SignupModal';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()
  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <ModalSignUp />
      </>
    );
  }

  return (
    <div className='nav-wrapper'>
      <img className='logo' src='https://1000logos.net/wp-content/uploads/2017/08/Airbnb-Logo-500x181.png' onClick={() => history.push('/')}></img>
    <ul>
      <li onClick={() => history.push('/createSpotForm')}>Host Your Place</li>

      <li>
        {isLoaded && sessionLinks}
      </li>
    </ul>
    </div>
  );
}

export default Navigation;
