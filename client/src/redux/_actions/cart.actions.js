import { cartConstants } from "../constants/cart.constants";

function addToCartAction ( addedItem ) {
    return ( dispatch ) => {
        dispatch({ type: cartConstants.ACTION_TYPE_ADD_TO_CART, payload: addedItem });
    }
}

function removeFromCartAction ( removedItem ) {
    return ( dispatch ) => {
        dispatch({ type: cartConstants.ACTION_TYPE_REMOVE_FROM_CART, payload: removedItem });
    }
}

function increaseCartIndexAction () {
    return ( dispatch ) => {
        dispatch({ type: cartConstants.ACTION_TYPE_INCREASE_CART_INDEX })
    }
}

function decreaseCartIndexAction () {
    return ( dispatch ) => {
        dispatch({ type: cartConstants.ACTION_TYPE_DECREASE_CART_INDEX })
    }
}

export const cartActions = {
    addToCartAction,
    removeFromCartAction,
    increaseCartIndexAction,
    decreaseCartIndexAction
}