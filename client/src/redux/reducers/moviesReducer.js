import * as actionTypes from "../actions/actionTypes";

let initState = {
    loading: {},
    movies: [],
    error: {}
}

export default function moviesReducer(state = initState, action){

    switch (action.type) {
        case actionTypes.ACTION_TYPE_FETCH_MOVIES_REQUEST:
            return {
                ...state,
                loading: action.payload
            }
        
        case actionTypes.ACTION_TYPE_FETCH_MOVIES_SUCCESS:
            return {
                ...state, 
                movies: action.payload
            }
        
        case actionTypes.ACTION_TYPE_FETCH_MOVIES_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}