import { csrfFetch } from "./csrf";


export const GETALLSPOTS = 'spots/getAllSpots'
export const CREATEDSPOT = 'spots/CREATESPOT'
export const EDITASPOT = 'spots/editspot'
export const DELETEASPOT = 'spots/deletespot'
export const GETDETAILSFROMSPOT = 'spots/spotId'
export const OWNEDSPOTS = 'spots/current'
// export const ADDIMGTOSPOTID = 'spots/IMGSPOT'
// export const GETREVIEWSBYSPOTID = 'spots/reviews'
// export const CREATEDREVIEWSPOTID = 'spots/reviewspotid'
// export const GETALLBOOKINGSSPOTID = 'spots/getbookings'
// export const CREATEABOOKINGSPOTID = 'spots/createbookings'


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
    if (response.ok){
        const data = await response.json();
        dispatch(getAllSpots(data.Spots))
    }
}


const createdSpot = (payload) => {
    return {
        type: CREATEDSPOT,
        payload
    }
}
export const createSpot = (payload) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
    })
    const data = await response.json()
    dispatch(createdSpot(data))
    return response
}


//edit
const editSpot = (spotId) => {
    return {
        type: EDITASPOT,
        spotId
    }
}
export const EditSpot = (payload, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })
    if (response.ok){
        const data = await response.json();
        dispatch(editSpot(data))
        return response;
    }
}

//Get one spot
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
    if (response.ok){
        const data = await response.json();
        dispatch(spotDetailAction(data))
        return response;
    }
}

//myListings route
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

const deleteSpot = (payload) => {
    return {
        type: DELETEASPOT,
        payload
    }
}
export const deleteYourSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    const data = await response.json()
    dispatch(deleteSpot(spotId))
    return response
}








// const addImgToSpot = (spotId, url, userId) => {
    //     return {
        //         type: ADDIMGTOSPOTID,
        //         spotId,
        //         url,
        //         userId
        //     }
        // }

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
