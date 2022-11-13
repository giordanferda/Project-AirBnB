import { csrfFetch } from "./csrf";

export const GETALLSPOTS = "spots/getAllSpots";
export const GET_ALL_SPOTS_SEARCH = "spots/getAllSpotsSearch";
export const CREATEDSPOT = "spots/CREATESPOT";
export const EDITASPOT = "spots/editspot";
export const DELETEASPOT = "spots/deletespot";
export const GETDETAILSFROMSPOT = "spots/spotId";
export const OWNEDSPOTS = "spots/current";
export const CREATEREVIEW = "spots/createReview";

//Get all spots
const getAllSpots = (payload) => {
  return {
    type: GETALLSPOTS,
    payload,
  };
};

export const allSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllSpots(data.Spots));
    return response;
  }
};

const getAllSpotsAction = (spots) => {
    return {
        type: GET_ALL_SPOTS_SEARCH,
        payload: spots
    };
};

export const getAllSpotsThunk = () => async (dispatch) => {

    const response = await csrfFetch('/api/spots');
    const spots = await response.json();

    // console.log(spots)

    dispatch(getAllSpotsAction(spots));
    return response;
};

//Create Spot
const createdSpot = (payload) => {
  return {
    type: CREATEDSPOT,
    payload,
  };
};
export const createSpot = (payload) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    const imageResponse = await csrfFetch(`/api/spots/${data.id}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: payload.url,
        previewImage: payload.previewImage,
      }),
    });
    if (imageResponse.ok) {
      const imageData = await imageResponse.json();
      data.previewImage = imageData.url;
      dispatch(createdSpot(data));
    }
  }
};

//edit
const editSpot = (spot) => {
  return {
    type: EDITASPOT,
    spot,
  };
};
export const EditSpot = (payload, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(editSpot(data));
    return response;
  }
};

//Get one spot
const spotDetailAction = (payload) => {
  return {
    type: GETDETAILSFROMSPOT,
    payload,
  };
};
export const getSpotDetailById = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(spotDetailAction(data));
    return response;
  }
};

//myListings route
const ownedSpots = (payload) => {
  return {
    type: OWNEDSPOTS,
    payload,
  };
};

export const getSpotsById = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current", {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(ownedSpots(data));
    return data;
  }
  return response;
};

//Delete a spot
const deleteSpot = (payload) => {
  return {
    type: DELETEASPOT,
    payload,
  };
};
export const deleteYourSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteSpot(spotId));
    return data;
  }
  return response;
};

const spotReducer = (state = {}, action) => {
  let newState;
  let spots;
  switch (action.type) {
    case GETALLSPOTS:
      newState = {};
      action.payload.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    case GET_ALL_SPOTS_SEARCH:
      spots = { ...state, allSpots: { ...state.allSpots }, allUserSpots: { ...state.allUserSpots }, oneSpot: null }
            let allSpots = {}
            for (let spot of action.payload.Spots) {
                allSpots[spot.id] = spot
            }
            spots.allSpots = allSpots
            return spots
    case GETDETAILSFROMSPOT:
      newState = {};
      newState[action.payload.id] = action.payload;
      // ...newState[action.payload.id]

      return newState;
    case CREATEDSPOT:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case OWNEDSPOTS:
      newState = {};
      Object.values(action.payload.Spots).forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    case EDITASPOT:
      newState = { ...state };
      newState[action.spot.id] = action.spot;
      return newState;
    case DELETEASPOT:
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
