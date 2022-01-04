import * as actionTypes from "../actions/actionTypes";

export default function cartReducer(state={cartIndex: 0}, action){
    switch (action.type) {
        case actionTypes.ACTION_TYPE_ADD_TO_CART:
            return {cartIndex:state.cartIndex+1};
            
        default:
            return state;
    }

}