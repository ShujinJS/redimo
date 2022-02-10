import { cartConstants } from "../constants/cart.constants";

function addToCartAction ( addedItem ) {
    return ( dispatch ) => {
        dispatch({ type: cartConstants.ACTION_TYPE_ADD_TO_CART, payload: addedItem });
    }
}

export const cartActions = {
    addToCartAction
}