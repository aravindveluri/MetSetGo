import api from "../services/api";
import TokenService from "../services/TokenService";
import AuthActionType from "../types/authActionType"

const LoginAuthAction = (userState, history) => {
    return async (dispatch) => {
        try {
            const data = await api.post("/auth/token/", userState)
            dispatch({
                type: AuthActionType.AUTH_SUCCESS,
                payload: data.data
            })

            history.push("/")
            
        } catch (error) {
            console.log(error)
            dispatch({
                type: AuthActionType.AUTH_FAIL,
                payload: {}
            })
        }
    }
}

const LogOutAuthAction = (history) => {
    return async (dispatch) => {
        try {
            const data = (await api.post("/auth/logout/", { refresh: TokenService.getLocalRefreshToken() }))
            dispatch({
                type: AuthActionType.LOGOUT_SUCCESS,
                payload: {}
            })

            history.push("/")

        } catch (err) {
            console.log(err)
        }
    }
}



export {LogOutAuthAction, LoginAuthAction}