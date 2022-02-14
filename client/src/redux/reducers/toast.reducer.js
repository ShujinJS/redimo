import { toastConstants } from "../constants/toast.constants";

let initState = {
    showToast: false,
    toastMessage: ""
}

export function toastReducer( state = initState, action ) {
    switch ( action.type ) {
        case toastConstants.ACTION_TYPE_SHOW_TOASTIFY:
            return { ...state, showToast: true, toastMessage: action.payload };
        case toastConstants.ACTION_TYPE_CLOSE_TOASTIFY:
            return { ...state, showToast: false };
        default:
            return state;
    }
}