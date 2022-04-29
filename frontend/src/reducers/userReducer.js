import UserActionType from "../types/userActionType"

const userState = {
    profileInfo: null
}
const userReducer = (state = userState, action) => {
    switch (action.type) {
        case UserActionType.GET_PROFILE:
            return {
                profileInfo: action.payload,
            }


        default:
            return state
    }
}

export default userReducer;