import { combineReducers } from "redux";
import { managementReducer } from "./managementReducer";


const rootReducer=combineReducers({managementReducer});


export default rootReducer;