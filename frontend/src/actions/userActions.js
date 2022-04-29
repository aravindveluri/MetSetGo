import userAPI from '../services/userService'
import AuthActionType from '../types/authActionType'
import UserActionType from "../types/userActionType"

export const getUserProfile = (uid, history) => {
    return async (dispatch) => {
        try {
            const data = await userAPI.getProfile(uid)
            dispatch({
                type: UserActionType.GET_PROFILE,
                payload: data.data
            })
            
        } catch (error) {
            console.log(error)
            if (error.response.data.code === "token_not_valid") {
                history.push("/login")
                dispatch({
                    type: AuthActionType.AUTH_FAIL,
                    payload: {}
                })
            }

        }
    }
} 


