import * as spotReducerString from '../store/spots'




const spotReducer = (state = {}, action) => {
    let newState;
    switch (action.type){
        case spotReducerString.GETALLSPOTS:
            newState = {...state}
            newState.spots = action.payload.Spots;
            return newState
        default:
            return state
    }
}

export default spotReducer;
