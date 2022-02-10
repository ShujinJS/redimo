import { cartConstants } from "../constants/cart.constants";

let initState = {
    cartItems: []
}

export function cartReducer( state = initState, action ) {
    switch ( action.type ) {
        case cartConstants.ACTION_TYPE_ADD_TO_CART:
            let newState = { ...state, cartItems: [action.payload, ...state.cartItems] };
            return newState;
        case cartConstants.ACTION_TYPE_REMOVE_FROM_CART:
            let _id = action.payload._id;
            return { ...state, cartItems: state.cartItems.filter((cart) => cart._id !== _id) };
        default:
            return state;
    }
}