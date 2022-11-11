import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSpotDetailById } from "../../store/spots";
import { useParams } from "react-router-dom";
import CreateReview from "../CreateReviewForm/CreateReviewForm";
import { allReviews, deleteYourReview } from "../../store/reviews";
import CreateBooking from "../CreateBooking/CreateBooking";
import "./spotShowPage.css";

function GetSpotbyId() {
  const { spotId } = useParams();
  const { ownerId } = useParams();

  const todayDate = new Date().toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const spots = useSelector((state) => Object.values(state.spots));
  const spot = spots.find((spot) => spot.id === parseInt(spotId));
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const reviewState = useSelector((state) => state.reviews);

  const reviews = Object.values(reviewState);
  useEffect(() => {
    dispatch(getSpotDetailById(spotId));
    dispatch(allReviews(spotId));
  }, [dispatch, spotId]);

  const filterReviews = reviews.filter((review) => {
    return review.spotId === parseInt(spotId);
  });

  // to dynamically render the price based on different dates

  let dateInt;

  if (isNaN((new Date(endDate) - new Date(startDate)) / 86400000) || ((new Date(endDate) - new Date(startDate)) / 86400000) < 0) {
    dateInt = 0;
  } else {
    dateInt = (new Date(endDate) - new Date(startDate)) / 86400000
  }
  console.log('this is dateInt', dateInt)


  //if the user has already reviewed the spot then the input box for reviews will not show up
  const alreadyReviewed = (reviews) => {
    let alreadyReviewedByUser = false;
    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i].userId === user.id) {
        alreadyReviewedByUser = true;
      }
    }
    return alreadyReviewedByUser;
  };

  const reviewBelongsToUser = (review) => {
    return review.userId === user.id;
  };

  if (spot === undefined) {
    return;
  }

  return (
    <div className="spotContainer">
      <div className="spot-detail-review">
        <div className="title-container">
          <h3 className="title-Spot">{spot.name}</h3>
          <div className="title-info">
            <i className="fa-solid fa-star star"></i>
            <span>
              {spot.avgStarRating
                ? parseFloat(spot.avgStarRating).toFixed(1)
                : "No reviews yet"}{" "}
              ({reviews.length} reviews)
            </span>
            <span>
              {spot.city}, {spot.state}, {spot.country}
            </span>
          </div>
        </div>

        {spot &&
          spot?.Images?.map((image, index) => (
            <div className="imgParentContainer">
              <div className="mainImgContainer">
                <img
                  className="Big"
                  src={image.url}
                  key={"imageId: " + JSON.stringify(index) + "big"}
                  alt="NOT FOUND"
                />
              </div>
              <div className="secondaryImgContainer">
                <img
                  className="oneSpot-Image small"
                  src={image.url}
                  key={"imageId: " + JSON.stringify(index) + "topleft"}
                  alt="NOT FOUND"
                />

                <img
                  className="oneSpot-Image small corner-top"
                  src={image.url}
                  key={"imageId: " + JSON.stringify(index) + "topright"}
                  alt="NOT FOUND"
                />
                <img
                  className="oneSpot-Image small"
                  src={image.url}
                  key={"imageId: " + JSON.stringify(index) + "bottomleft"}
                  alt="NOT FOUND"
                />
                <img
                  className="oneSpot-Image small corner-bottom"
                  src={image.url}
                  key={"imageId: " + JSON.stringify(index) + "bottomright"}
                  alt="NOT FOUND"
                />
              </div>
            </div>
          ))}

        <div className="description-checkin-container">
          <div className="checkin-description">
            <div className="description">{spot.description}</div>
          </div>
          <div className="checkin">
            <div className="checkin-star-price">
              <div>{`$${spot.price} /night`}</div>
              <span className="spancheckin">
                <div>
                  <i className="fa-solid fa-star"></i>
                  {spot.avgStarRating}
                </div>
                <div className="period">·</div>
                <span>{`${reviews.length} review${
                  reviews.length === 1 ? "" : "s"
                }`}</span>
              </span>
            </div>
              <div className="spotDetailBoxTwo ">
                <CreateBooking
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  todayDate={todayDate}
                  startDate={startDate}
                  endDate={endDate}
                  spotId={spotId}
                />
                <span className="you-wont-be-charged">You won't be charged yet</span>
              </div>

            <div className="checkin-star-price">
              <div>Cleaning Fee</div>
              <div>Free</div>
            </div>
            <div className="checkin-star-price">
              <div>Service Fee</div>
              <div>Free</div>
            </div>
            <div className="checkin-star-price total-price">
              <div>Total before Taxes</div>
              <div>${dateInt * spot?.price}</div>
            </div>
          </div>
        </div>
        <div className="reviewContainer">
          {filterReviews.map((review, i) => (
            <div className="reviewOne" key={review.id} review={review}>
              Review {i + 1}: {""}
              <div>
                <i className="fa-solid fa-star"></i> {review.stars}{" "}
                {review.review}
                {user && reviewBelongsToUser(review) && (
                  <button
                    className="Delete-button"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(deleteYourReview(review.id));
                    }}
                  >
                    Delete Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="review-box">
          {user &&
            alreadyReviewed(filterReviews) === false &&
            user.id !== spot.ownerId && <CreateReview spotId={spot?.id} />}
        </div>
      </div>
    </div>
  );
}

export default GetSpotbyId;
