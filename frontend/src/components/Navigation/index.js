import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import picture from "../../assets/Ferda.png";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
import Search from "../Search/Search";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  let allSpots = useSelector((state) => state?.spots?.allSpots);
  if (allSpots) {
    allSpots = Object.values(allSpots);
  }
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
      <Search />
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
