import * as actionTypes from "../actions/actionTypes";

let initState = {
    loading: true,
    movies: [],
    error: ""
}

export default function moviesReducer(state = initState, action){

    switch (action.type) {
        case actionTypes.ACTION_TYPE_FETCH_MOVIES_REQUEST:
            return {
                loading: state.loading = true
            }
        
        case actionTypes.ACTION_TYPE_FETCH_MOVIES_SUCCESS:
            return {
                loading: false,
                movies: action.payload
            }
        
        case actionTypes.ACTION_TYPE_FETCH_MOVIES_FAILURE:
            return {
                loading: false,
                movies: [],
                error: action.payload
            }
        default:
            return state;
    }
}