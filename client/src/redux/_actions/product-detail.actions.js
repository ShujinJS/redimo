import { productDetailConstants } from "../constants/product-detail.constant";
import * as actions from "../_actions/actions";

function getProductDetailAction ( selectedProduct ) {
    return ( dispatch ) => {
        dispatch({ type: productDetailConstants.ACTION_TYPE_GET_PRODUCT_DETAIL, payload: selectedProduct })
    }
}

function clearProductDetailAction () {
    return { type: productDetailConstants.ACTION_TYPE_CLEAR_PRODUCT_DETAIL }
}

export const productDetailActions = {
    getProductDetailAction,
    clearProductDetailAction
}