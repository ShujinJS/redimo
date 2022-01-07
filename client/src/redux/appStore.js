import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
 
import { rootReducer } from "./reducers/reducerCombiner";

export const appStore = createStore(
    rootReducer,
    applyMiddleware(logger, thunk)
);