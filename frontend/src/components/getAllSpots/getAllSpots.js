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
        <div className="gridSpot">
          {spots.map((spot, index) => (
            <div key={`${index}_${spot.id}`} className="card">
              <NavLink className="allSpots" to={`/spots/${spot.id}`}>
                <img
                  className="Image"
                  src={
                    spot.previewImage === undefined ? img : spot.previewImage
                  }
                  alt={spot.name}
                ></img>
                <div className="grouping-info">
                  <h1>
                    {spot.city},{spot.state}
                  </h1>
                  <span>
                    <i className="fa-solid fa-star"></i>
                    {`${spot.avgRating}`}
                  </span>
                </div>
                <h1>{`$${spot.price} /night`}</h1>
                <h1 className="spotName">{spot.name}</h1>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default Spots;
