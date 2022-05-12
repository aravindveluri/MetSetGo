import { combineReducers } from "redux";
import authReducer from './authReducer';
import registerReducer from "./registerReducer";
import userReducer from "./userReducer";

export default combineReducers({
    authReducer: authReducer,
    registerReducer: registerReducer,
    userReducer: userReducer
})