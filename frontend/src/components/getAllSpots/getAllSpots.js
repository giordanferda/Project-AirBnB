import React, { useEffect, useState } from "react";
import { allSpots } from "../../store/spots";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "./getAllSpots.css";
import img from "../../assets/noimg.jpg";
function Spots() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allSpots());
  }, [dispatch]);
  const spots = useSelector((state) => Object.values(state.spots));
  // console.log(spots, "THIS IS OUR SPOT");

  return (
    spots && (
      <div className="page-container">
        <div className="spots-container">
          <div className="gridSpot">
            {spots.map((spot, index) => (
              <div key={`${index}_${spot.id}`}>
                <NavLink className="allSpots" to={`/spots/${spot.id}`}>
                  <div>
                    {spot.city},{spot.state}
                  </div>
                  <span>
                    <i className="fa-solid fa-star"></i>
                    {`${spot.avgRating}`}
                  </span>
                  <div>{`$${spot.price} night`}</div>
                  <img
                    className="Image"
                    src={
                      spot.previewImage === undefined ? img : spot.previewImage
                    }
                    alt={spot.name}
                  ></img>
                  <div className="spotName">{spot.name}</div>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}

export default Spots;
