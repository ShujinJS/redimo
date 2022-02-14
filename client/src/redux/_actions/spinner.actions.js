import { spinnerConstants } from "../constants/spinner.constants";

function startSpinnerAction () {
    return ( dispatch ) => {
        dispatch({ type: spinnerConstants.ACTION_TYPE_START_SPINNER })
    }
}

function endSpinnerAction () {
    return ( dispatch ) => {
        dispatch({ type: spinnerConstants.ACTION_TYPE_END_SPINNER })
    }
}

export const spinnerActions = {
    startSpinnerAction,
    endSpinnerAction
}