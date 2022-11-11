import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import picture from "../../assets/FerdaBnb.jpg";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  let sessionLinks;

  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
      </>
    );
  }

  return (
    <div className="nav-wrapper">
      <img
        className="logo"
        src={picture}
        onClick={() => history.push("/")}
        alt="NOT FOUND"
      ></img>
      <ul>
        <li
          className="host-your-place"
          onClick={() =>
            history.push(sessionUser ? "/createSpotForm" : "/signup")
          }
        >
          Host Your Place
        </li>

        <li className="button-login-signup">{isLoaded && sessionLinks}</li>
      </ul>
    </div>
  );
}

export default Navigation;
