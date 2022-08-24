import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

import ModalSignUp from '../SignupModal';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

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
    <ul>
      <li>
        <NavLink exact to="/">
        <i class="fa-solid fa-spade"></i>
        </NavLink>
        {isLoaded && sessionLinks}
        <div>
        </div>
      </li>
    </ul>
  );
}

export default Navigation;
