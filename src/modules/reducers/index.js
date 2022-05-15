import { combineReducers } from "redux";
import ttvReducer from "./ttv";

const rootReducer = combineReducers({
    ttv: ttvReducer,
});

export default rootReducer;