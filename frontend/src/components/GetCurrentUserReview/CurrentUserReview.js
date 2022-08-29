import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserReview, deleteYourReview } from "../../store/reviews";
import { allSpots } from "../../store/spots";
import "./CurrentUserReview.css";
const CurrentUserReviews = () => {
  const user = useSelector((state) => state.session.user);

  const reviews = useSelector((state) => Object.values(state.reviews));

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
  const renderDate = (string) => {
    const parts = string.split("-");
    const year = `, ${parts[0]}`;
    switch (parts[1]) {
      case "01":
        return "January" + year;
      case "02":
        return "Feburary" + year;
      case "03":
        return "March" + year;
      case "04":
        return "April" + year;
      case "05":
        return "May" + year;
      case "06":
        return "June" + year;
      case "07":
        return "July" + year;
      case "08":
        return "August" + year;
      case "09":
        return "September" + year;
      case "10":
        return "October" + year;
      case "11":
        return "November" + year;
      case "12":
        return "December" + year;
    }
  };

  return (
    <div className="currentReviewContainer">
      <h2 className="MyReviewHeader">My Reviews</h2>
      <div className="current-review-wrap">
        {reviews.map((review, i) => (
          <div className="review-card" key={`${review.id} ${i + 1}`}>
            <div className="users-name">
              {`${user.firstName} ${user.lastName}`}{" "}
            </div>
            <span>
              {" "}
              <i className="fa-solid fa-star"></i> {review.stars}
            </span>
            <div>{renderDate(review.createdAt)}</div>

            <div>{`Review ${i + 1}: ${review.review}`}</div>
            <button
              className="SpotButton"
              onClick={() => handleDeleteButton(review.id)}
            >
              Delete Review
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentUserReviews;
