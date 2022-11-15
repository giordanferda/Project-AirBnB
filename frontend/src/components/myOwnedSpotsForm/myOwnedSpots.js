import React, { useEffect } from "react";
import { allSpots, getSpotsById } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { deleteYourSpot } from "../../store/spots";
import { useModalContext } from "../../context/Modal";
// import "../getAllSpots/getAllSpots.css";
import "./myOwnedSpots.css";

const MyOwnedSpots = ({ spot }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const spots = useSelector((state) => Object.values(state.spots));
  const userSpots = spots.filter((spot) => spot?.ownerId === user.id);

  useEffect(() => {
    dispatch(getSpotsById());
    dispatch(allSpots());
  }, [dispatch]);

  const { setUserSearch } = useModalContext();
  const openPage = () => {
    setUserSearch("");
    history.push(`/spots/${spot.id}`);
  };

  const handleDelete = (spotId) => {
    dispatch(deleteYourSpot(spotId));
    history.push("/");
  };
  if (!spots) {
    return null;
  }
  return (
    <div className="page-container">
      <h2 className="MySpotHeader">My Spots</h2>
      <div className="gridSpot">
        {userSpots.map((spot, i) => {
          return (
            <div className="cardsforOwned" key={i}>
              <img className="Image" src={spot.previewImage}></img>
              <div className="spotAddy-Owned">{spot.address}</div>
              <div className="grouping-info">
                {spot.city}, {spot.state}
              </div>
              <div className="spot-price-h1">{`$${spot.price} /night`}</div>
              <span>
                <i className="fa-solid fa-star"></i>
                {`${spot.avgRating}`}
              </span>
              <div className="buttonforowned">
                <button
                  onClick={() => {
                    handleDelete(spot.id);
                  }}
                >
                  Delete Spot
                </button>
                <button onClick={() => history.push(`/editSpot/${spot.id}`)}>
                  Edit Spot
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOwnedSpots;
