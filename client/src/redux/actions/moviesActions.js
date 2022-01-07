import * as actionTypes from "./actionTypes";

export const fetchMoviesRequest = () =>{
    return {
        type: actionTypes.ACTION_TYPE_FETCH_MOVIES_REQUEST
    };
}

export const fetchMoviesSuccess = movies => {
    return {
        type: actionTypes.ACTION_TYPE_FETCH_MOVIES_SUCCESS,
        payload: movies
    }
}

export const fetchMoviesFailure = error => {
    return {
        type: actionTypes.ACTION_TYPE_FETCH_MOVIES_FAILURE,
        payload: error
    }
}

export const fetchMovies = () => {

    const apiBaseUrl = "http://localhost:3004";

    return (dispatch) => {
        dispatch(fetchMoviesRequest)
        fetch(`${apiBaseUrl}/movies`)
            .then(function(response){
                return response.json();
            })
            .then(function(jsonResponse){
                const movies = jsonResponse;
                console.log(movies)
                dispatch(fetchMoviesSuccess(movies))
            })
            .catch(function(err){
                console.log(err)
                dispatch(fetchMoviesFailure(err))
            })
    }   
}