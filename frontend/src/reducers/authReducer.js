import AuthActionType from "../types/authActionType"
import TokenService from "../services/TokenService";

const authTokens =  TokenService.getAuthTokens()
const authState = authTokens
    ? {isLoggedIn: true, user: authTokens}
    : {isLoggedIn: false, user: null} 


const authReducer = (state = authState, action) => {
    console.log(state, action.type)
    switch (action.type) {
        case AuthActionType.AUTH_SUCCESS:
        case AuthActionType.SET_TOKENS:
            const newAuthState = {
                isLoggedIn: true,
                user: action.payload
            }
            TokenService.setAuthTokens(newAuthState.user)
            return newAuthState

        case AuthActionType.AUTH_FAIL:
            TokenService.removeAuthTokens()
            return {isLoggedIn: false, user: null} 

        case AuthActionType.LOGOUT_SUCCESS:
            TokenService.removeAuthTokens()
            return {isLoggedIn: false, user: null} 
    
        default:
            return state
    }
}

export default authReducer