import api from "../services/api";
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



export default LoginAuthAction