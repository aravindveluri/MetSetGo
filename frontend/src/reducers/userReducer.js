import { bindActionCreators } from "redux"
import UserActionType from "../types/userActionType"

const userState = {
    profileInfo: null,
    sports: [],
    venues: [],
    eventPage: null,
    joinEvent: false,
    events: [],
    playerEvents: {},
}
const userReducer = (state = userState, action) => {
    switch (action.type) {
        case UserActionType.GET_PROFILE:
        case UserActionType.EDIT_PROFILE:
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
        
        case UserActionType.GET_ALL_EVENTS:
            return {
                ...state,
                events: [...action.payload],
            }

        case UserActionType.DELETE_EVENT:
            return {
                ...state,
                eventPage: null,
            }

        case UserActionType.PLAYER_EVENTS:
            return {
                ...state,
                playerEvents: action.payload,
            }

        default:
            return state
    }
}

export default userReducer;