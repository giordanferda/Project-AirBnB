import { csrfFetch } from "./csrf";


export const GETALLSPOTS = 'spots/getAllSpots'
export const GETDETAILSFROMSPOT = 'spots/spotId'
export const OWNEDSPOTS = 'spots/current'
export const CREATEDSPOT = 'spots/CREATESPOT'
export const ADDIMGTOSPOTID = 'spots/IMGSPOT'
export const EDITASPOT = 'spots/editspot'
export const DELETEASPOT = 'spots/deletespot'
export const GETREVIEWSBYSPOTID = 'spots/reviews'
export const CREATEDREVIEWSPOTID = 'spots/reviewspotid'
export const GETALLBOOKINGSSPOTID = 'spots/getbookings'
export const CREATEABOOKINGSPOTID = 'spots/createbookings'


const getAllSpots = (payload) => {
    return {
        type: GETALLSPOTS,
        payload
    }
}

export const allSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'GET'
    })
    const data = await response.json();
    dispatch(getAllSpots(data))
    return response;
}


const spotDetailAction = (payload) => {
    return {
        type: GETDETAILSFROMSPOT,
        payload
    }
}
export const getSpotDetailById = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'GET'
    })
    const data = await response.json();
    dispatch(spotDetailAction(data))
    return response;
}

const ownedSpots = (payload) => {
    return {
        type: OWNEDSPOTS,
        payload
    }
}
export const getSpotsById = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current', {
        method: 'GET'
    })
    const data = await response.json();
    dispatch(ownedSpots(data))
    return response;
}

const createdSpot = (ownerId, payload) => {
    return {
        type: CREATEDSPOT,
        ownerId,
        payload
    }
}

// const addImgToSpot = (spotId, url, userId) => {
//     return {
//         type: ADDIMGTOSPOTID,
//         spotId,
//         url,
//         userId
//     }
// }

const editSpot = (spotId) => {
    return {
        type: EDITASPOT,
        spotId
    }
}

// const getReviews = (spotId) => {
//     return {
//         type: GETREVIEWSBYSPOTID,
//         spotId
//     }
// }

// const createReview = (spotId, payload) => {
//     return {
//         type: CREATEDREVIEWSPOTID,
//         payload
//     }
// }

// const getBookings = (userId, spotId, payload) => {
//     return {
//         type: GETALLBOOKINGSSPOTID,
//         userId,
//         spotId,
//         payload
//     }
// }

// const createBooking = (spotId, payload) => {
//     return {
//         type: CREATEABOOKINGSPOTID,
//         spotId,
//         payload
//     }
// }