import UserActionType from "../types/userActionType"

const userState = {
    profileInfo: null,
    sports: [],
    venues: [],
    eventPage: null,
    joinEvent: false,
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
    
        case UserActionType.GET_EVENT:
            return {
                ...state,
                eventPage: action.payload,
            }

        case UserActionType.JOIN_EVENT:
            return {
                ...state,
                joinEvent: true,
            }
        
        default:
            return state
    }
}

export default userReducer;