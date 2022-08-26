import { csrfFetch } from "./csrf";

export const CREATEAREVIEW = "reviews/createReview";
export const GETALLREVIEWS = "reviews/getAllReviews";
export const DELETEREVIEW = "reviews/deleteReview";

//Create a review
const createReview = (payload) => {
  return {
    type: CREATEAREVIEW,
    payload,
  };
};

export const createdReview = (spotId, payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  dispatch(createReview(data));
  return response;
};

//Get all reviews
const getAllReviews = (payload) => {
  return {
    type: GETALLREVIEWS,
    payload,
  };
};

export const allReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  dispatch(getAllReviews(data));
  return response;
};

//Delete a review

const deleteReview = (payload) => {
  return {
    type: DELETEREVIEW,
    payload,
  };
};
export const deleteYourReview = (reviewId) => async (dispatch) => {
  await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  dispatch(deleteReview(reviewId));
};

const reviewReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case CREATEAREVIEW:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case GETALLREVIEWS:
      newState = {};
      action.payload.Reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    case DELETEREVIEW:
      // newState = { ...state };
      // delete newState[action.payload];
      return {};
    default:
      return state;
  }
};

export default reviewReducer;
