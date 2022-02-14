import { spinnerConstants } from "../constants/spinner.constants";

let initState = {
    isLoading: false
}

export function spinnerReducer( state = initState, action ) {
    switch ( action.type ) {
        case spinnerConstants.ACTION_TYPE_START_SPINNER:
            return { isLoading: true };
        case spinnerConstants.ACTION_TYPE_END_SPINNER:
            return { isLoading: false };
        default:
            return state;
    }
}