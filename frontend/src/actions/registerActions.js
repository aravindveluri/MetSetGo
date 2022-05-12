import api from "../services/api";
import RegisterActionType from "../types/registerActionType"

const RegisterAuthAction = (userState, history) => {
    return async (dispatch) => {
        try {
            const data = await api.post("/auth/register/", userState)
            dispatch({
                type: RegisterActionType.REGISTER_SUCCESS,
                payload: data
            })

            history.push("/login")
            
        } catch (error) {
            console.log(error)
            dispatch({
                type: RegisterActionType.REGISTER_FAIL,
                payload: {}
            })
        }
    }
}


export default RegisterAuthAction