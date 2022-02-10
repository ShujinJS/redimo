import { productDetailReducer } from "./product-detail.reducer";
import { cartReducer } from "./cart.reducer";

import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    /** ALTERNATİF YAZIM
     * cartReducer,
     * collectionsReducer
    **/
    productDetailReducer: productDetailReducer,
    cartReducer: cartReducer
});