import * as spotReducerString from '../store/spots'


const spotReducer = (state = {}, action) => {
    let newState;
    switch (action.type){
        case spotReducerString.GETALLSPOTS:
            newState = {...state, ...action.payload.Spots};
            return newState
            case spotReducerString.OWNEDSPOTS:
            newState = {...state, ...action.payload.Spots};
            return newState
            case spotReducerString.GETDETAILSFROMSPOT:
                newState = {...state, ...action.payload}
                return newState
        default:
            return state
    }
}

export default spotReducer;
