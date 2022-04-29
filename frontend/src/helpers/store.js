import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import AuthActionType from '../types/authActionType';


const initialState = {}
const middleWare = [thunk]

export default configureStore({
	reducer: rootReducer,
    preloadedState: initialState,
    middleware: middleWare,
    devTools: true
});