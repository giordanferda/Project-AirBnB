import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserReview, deleteYourReview } from "../../store/reviews";
import { allSpots } from "../../store/spots";

const CurrentUserReviews = () => {
  const user = useSelector((state) => state.session.user);

  const reviews = useSelector((state) => Object.values(state.reviews));
  console.log(reviews, "THIS IS REVIEWS");

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUserReview());
    dispatch(allSpots());
  }, []);

  const handleDeleteButton = (reviewId) => {
    dispatch(deleteYourReview(reviewId));
    // history.push("/");
  };

  return (
    <div>
      <h2>My Reviews</h2>
      {reviews.map((review, i) => (
        <div key={`${review.id} ${i + 1}`}>
          <div>{`${user.firstName} ${user.lastName}`}</div>
          <div>{`Review ${i + 1}: ${review.review}`}</div>
          <button onClick={() => handleDeleteButton(review.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default CurrentUserReviews;
