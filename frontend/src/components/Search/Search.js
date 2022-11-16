import React, { useState, useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { allSpots, getAllSpotsThunk } from "../../store/spots";
import { Modal, useModalContext } from "../../context/Modal";
import search from "./SearchImg.png";
import questionmark from "./QuestionMarkImg.png";
import "./Search.css";

function Search() {
  const { searchToggle, setSearchToggle, userSearch, setUserSearch } =
    useModalContext();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // dispatch(getAllSpotsThunk());
    dispatch(allSpots())
  }, [dispatch]);

  const spots = useSelector((state) => Object.values(state.spots));
  // allSpots = useSelector((state) => state?.spots?.allSpots);
  // if (allSpots) {
  //   allSpots = Object.values(allSpots);
  // }
  // console.log(allSpots, 'this is all spots')

  const handleSearch = (id) => {
    history.push(`/spots/${id}`);
    setUserSearch("");
    setSearchToggle(!searchToggle);
  };

  return (
    <div className="search-container">
      <img className="Search-icon" src={search}></img>
      <div className="results">

      <input
        className="search_inputbox"
        type="text"
        value={userSearch}
        onChange={(e) => setUserSearch(e.target.value) && setSearchToggle(true)}
        required
        placeholder="Search listed spots..."
        ></input>
      <div className="Search_results">
        {userSearch &&
          spots.
          filter((spot) =>
          spot?.name?.toLowerCase().startsWith(userSearch.toLowerCase())
          )
          .slice(0, 5)
          .map((spot) => (
            <div
            key={spot.id}
            className="Search_card"
            onClick={() => handleSearch(spot.id)}
            >
                <img className="SearchImg" src={spot.previewImage}></img>
                <div className="Search_Lower">
                  <div className="Search_Title">{spot.name}</div>
                  <div className="Search_Sub">
                    {spot.city},{spot.state}
                  </div>
                </div>
              </div>
            ))}
        {userSearch &&
          spots.filter((spot) =>
          spot?.name?.toLowerCase().startsWith(userSearch.toLowerCase())
          ).length === 0 && (
            <div className="Search_Null">
              <img className="SearchImg" src={questionmark}></img>
              <div className="Search_Lower">
                <div className="Search_Title">No Results Found</div>
                <div className="Search_Sub">Check your spelling</div>
              </div>
            </div>
          )}
          </div>
      </div>
    </div>
  );
}

export default Search;
