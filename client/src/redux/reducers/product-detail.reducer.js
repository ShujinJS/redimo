import { productDetailConstants } from "../constants/product-detail.constant";

let initState = {
    selectedProduct: {}
}

export function productDetailReducer( state = initState, action ) {
    switch ( action.type ) {
        case productDetailConstants.ACTION_TYPE_GET_PRODUCT_DETAIL:
            return { ...state, selectedProduct: action.payload };
        case productDetailConstants.ACTION_TYPE_CLEAR_PRODUCT_DETAIL:
            return { ...state, selectedProduct: null }
        default:
            return state;
    }
}
