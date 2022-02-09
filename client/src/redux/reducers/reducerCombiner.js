import { productDetailReducer } from "./product-detail.reducer";

import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    /** ALTERNATİF YAZIM
     * cartReducer,
     * collectionsReducer
    **/
    productDetailReducer: productDetailReducer
});