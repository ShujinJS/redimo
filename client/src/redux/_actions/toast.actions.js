import { toastConstants } from "../constants/toast.constants";

function showToastAction ( toastMessage ) {
    return ( dispatch ) => {
        dispatch({ type: toastConstants.ACTION_TYPE_SHOW_TOASTIFY, payload: toastMessage });
    }
}

function closeToastAction () {
    return ( dispatch ) => {
        dispatch({ type: toastConstants.ACTION_TYPE_CLOSE_TOASTIFY })
    }
}

export const toastActions = {
    showToastAction,
    closeToastAction
}