import React, { useState } from "react";
import { createdReview } from "../../store/reviews";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "../../context/Modal.css";

function CreateReview({ spotId }) {
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(1);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (spotId) => {
    const payload = {
      review,
      stars,
    };
    dispatch(createdReview(spotId, payload));
    // history.push('/')
  };

  return (
    <form id="modal-content" onSubmit={() => handleSubmit(spotId)}>
      <label>Review</label>
      <input
        value={review}
        onChange={(e) => {
          const textValue = e.target.value;
          if (textValue.length > 255) {
            return;
          }
          setReview(e.target.value);
        }}
      ></input>
      <label>Star Rating</label>
      <input
        type="number"
        value={stars}
        onChange={(e) => {
          const value = e.target.value;
          if (value > 5 || value < 1) {
            return;
          }
          setStars(e.target.value);
        }}
      ></input>
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default CreateReview;
