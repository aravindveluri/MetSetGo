import AuthActionType from "../types/authActionType"


const authTokens =  JSON.parse(localStorage.getItem("authTokens"));
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
            localStorage.setItem("authTokens", JSON.stringify (newAuthState.user))
            return newAuthState

        case AuthActionType.AUTH_FAIL:
            return {isLoggedIn: false, user: null} 
        
        default:
            return state
    }
}

export default authReducer