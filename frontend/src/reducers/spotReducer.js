import * as spotReducerString from '../store/spots'


const spotReducer = (state = {}, action) => {
    let newState;
    switch (action.type){
        case spotReducerString.GETALLSPOTS:
            newState = {  }
            action.payload.forEach((spot) => {
                newState[spot.id] = spot
            })
            return newState;
            // case spotReducerString.OWNEDSPOTS:
            // newState = {...state, ...action.payload.Spots};
            // return newState
            case spotReducerString.GETDETAILSFROMSPOT:
                // const imgDetails = {}
                newState = {0:{...action.payload}}
                return newState
            case spotReducerString.CREATEDSPOT:
                newState = {...state, ...action.payload}
                return newState
            case spotReducerString.OWNEDSPOTS:
                newState = {  }
                Object.values(action.payload.Spots).forEach((spot) => {
                    newState[spot.id] = spot
                })
                return newState;
            case spotReducerString.EDITASPOT:
                newState = { ...state };
                newState[action.spot.id] = action.spot;
                return newState;
            case spotReducerString.DELETEASPOT:
                newState = {...state}
                delete newState[action.payload]
                return newState
        default:
            return state
    }
}

export default spotReducer;
