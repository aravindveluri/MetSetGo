import UserActionType from "../types/userActionType"

const userState = {
    profileInfo: null,
    sports: [],
    venues: [],
}
const userReducer = (state = userState, action) => {
    switch (action.type) {
        case UserActionType.GET_PROFILE:
            return {
                ...state,
                profileInfo: action.payload,
            }

        case UserActionType.GET_SPORTS:
            return {
                ...state,
                sports: action.payload,
            }

        case UserActionType.GET_VENUES:
            return {
                ...state,
                venues: action.payload,
            }

    
        default:
            return state
    }
}

export default userReducer;