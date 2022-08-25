import { csrfFetch } from "./csrf";


export const CREATEAREVIEW = 'reviews/createReview'



//Create a review
const createReview = (payload) => {
    return {
        type: CREATEAREVIEW,
        payload
    }
}

export const createdReview = (spotId, payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })
    const data = await response.json()
    dispatch(createReview(data))
    return response
}


const reviewReducer = (state = {}, action) => {
    let newState;
    switch(action.type){
        case CREATEAREVIEW:
            newState = { ...state };
                newState[action.payload.id] = action.payload;
                return newState;
            default:
            return state
    }
}



export default reviewReducer;
