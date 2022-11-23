import React, { useEffect, useState } from "react";
import { allSpots } from "../../store/spots";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useModalContext } from "../../context/Modal";
import { getAllSpotsThunk } from "../../store/spots";
import "./getAllSpots.css";
import img from "../../assets/noimg.jpg";
function Spots({ spot }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (spots === null || spots === undefined) {
      return;
    }
    dispatch(allSpots());
    // dispatch(getAllSpotsThunk());
  }, [dispatch]);
  const spots = useSelector((state) => Object.values(state.spots));
  const history = useHistory();
  const { setUserSearch } = useModalContext();
  // const openPage = () => {
  //   setUserSearch("");
  //   history.push(`/spots/${spot.id}`);
  // };
  // if (spots === null || spots === undefined) {
  //   return null;
  // }

  return (
    spots && (
      <div className="page-container">
        <div className="gridSpot">
          {spots.map((spot, index) => (
            <div key={`${index}_${spot?.id}`} className="card">
              <NavLink className="allSpots" to={`/spots/${spot?.id}`}>
                <img
                  className="Image"
                  src={
                    spot?.previewImage === undefined ? img : spot?.previewImage
                  }
                  alt={spot?.name}
                ></img>
                <div className="grouping-info">
                  <h1>
                    {spot?.city},{spot?.state}
                  </h1>
                  <span>
                    <i className="fa-solid fa-star"></i>
                    {`${spot?.avgRating}`}
                  </span>
                </div>
                <h1 className="spot-price-h1">{`$${spot?.price} /night`}</h1>
                <h1 className="spotName">{spot?.name}</h1>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default Spots;
