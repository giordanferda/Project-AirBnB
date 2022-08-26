import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSpotDetailById } from "../../store/spots";
import { useParams } from "react-router-dom";
import CreateReview from "../CreateReviewForm/CreateReviewForm";
import { allReviews, deleteYourReview } from "../../store/reviews";

function GetSpotbyId() {
  const { spotId } = useParams();
  const spots = useSelector((state) => Object.values(state.spots));
  const spot = spots.find((spot) => spot.id === parseInt(spotId));
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => Object.values(state.reviews));
  // console.log(reviews);
  useEffect(() => {
    dispatch(getSpotDetailById(spotId));
    dispatch(allReviews(spotId));
  }, [dispatch, spotId]);

  const filterReviews = reviews.filter((review) => {
    // console.log(review.spotId, spotId);
    return review.spotId === parseInt(spotId);
  });

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
    // console.log(review.userId === user.id);
    // console.log(review.userId);
    // console.log(user.id);
    return review.userId === user.id;
  };

  if (spot === undefined) {
    return;
  }
  // console.log(filterReviews, "THIS IS FILTER", reviews, "THIS IS REVIEWS!");

  return (
    <div className="spot-detail-review">
      {spot &&
        spot?.Images?.map((image, index) => (
          <img
            src={image.url}
            key={"imageId: " + JSON.stringify(index)}
            alt="NOT FOUND"
          />
        ))}
      {user &&
        alreadyReviewed(filterReviews) === false &&
        user.id !== spot.ownerId && <CreateReview spotId={spot?.id} />}
      REVIEWS:{" "}
      {filterReviews.map((review, i) => (
        <div key={review.id} review={review}>
          Review {i + 1}: {""}
          <i className="fa-solid fa-star"></i> {review.stars} {review.review}
          {user && reviewBelongsToUser(review) && (
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(deleteYourReview(review.id));
              }}
            >
              Delete Review
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default GetSpotbyId;
