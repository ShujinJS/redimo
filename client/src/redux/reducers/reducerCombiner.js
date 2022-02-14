import { productDetailReducer } from "./product-detail.reducer";
import { cartReducer } from "./cart.reducer";
import { toastReducer } from "./toast.reducer";
import { spinnerReducer } from "./spinner.reducer";

import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    /** ALTERNATİF YAZIM
     * cartReducer,
     * collectionsReducer
    **/
    productDetailReducer: productDetailReducer,
    cartReducer: cartReducer,
    toastReducer: toastReducer,
    spinnerReducer: spinnerReducer
});