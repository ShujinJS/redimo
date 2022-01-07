import cartReducer from "./cartReducer";
import moviesReducer from "./moviesReducer";

import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    /** ALTERNATİF YAZIM
     * cartReducer,
     * collectionsReducer
    **/
    cartReducer: cartReducer,
    moviesReducer: moviesReducer
});