import * as actionTypes from "./actionTypes";

// Apollo custom hooks

export const fetchMoviesRequest = loading =>{
    return {
        type: actionTypes.ACTION_TYPE_FETCH_MOVIES_REQUEST,
        payload: loading
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

  

    return async (dispatch) => {
        await dispatch(fetchMoviesRequest(loading)) 
        await dispatch(fetchMoviesSuccess(data))
        await dispatch(fetchMoviesFailure(error))
    //     fetch(`${apiBaseUrl}/movies`)
    //         .then(function(response){
    //             return response.json();
    //         })
    //         .then(function(jsonResponse){
    //             const movies = jsonResponse;
    //             console.log(movies)
    //             dispatch(fetchMoviesSuccess(movies))
    //         })
    //         .catch(function(err){
    //             console.log(err)
    //             dispatch(fetchMoviesFailure(err))
    //         })
     }   
}