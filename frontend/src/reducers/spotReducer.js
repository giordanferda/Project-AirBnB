import * as spotReducerString from '../store/spots'


const spotReducer = (state = {}, action) => {
    let newState;
    switch (action.type){
        case spotReducerString.GETALLSPOTS:
            newState = {...state, ...action.payload.Spots};
            return newState
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
            newState = {...action.payload.Spots}
                return newState
        default:
            return state
    }
}

export default spotReducer;
