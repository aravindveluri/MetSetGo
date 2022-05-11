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

export const getVenues = () => {
    return async (dispatch) => {
        try {
            const data = await userAPI.getVenues()
            dispatch({
                type: UserActionType.GET_VENUES,
                payload: data.data
            })
            
        } catch (error) {
            console.log(error)

        }
    }
}

export const getSports = () => {
    return async (dispatch) => {
        try {
            const data = await userAPI.getSports()
            dispatch({
                type: UserActionType.GET_SPORTS,
                payload: data.data
            })
            
        } catch (error) {
            console.log(error)

        }
    }
}


export const createEventAction = (formState, history) => {
    return async (dispatch) => {
        try {
            const data = await userAPI.createEvent(formState)
            console.log("Post data", data)
            dispatch({
                type: UserActionType.CREATE_EVENT,
                payload: data.data
            })
            history.push(`/events/${data.data.id}`)
            
        } catch (error) {
            console.log(error)
        }
    }
}

export const editEventAction = (eid, formState, history) => {
    return async (dispatch) => {
        try {
            const data = await userAPI.editEvent(eid, formState)
            console.log("Put data", data)
            dispatch({
                type: UserActionType.EDIT_EVENT,
                payload: data.data
            })
            history.push(`/events/${data.data.id}`)
            
        } catch (error) {
            console.log(error)
        }
    }
}


export const getEventAction = (eid) => {
    return async (dispatch) => {
        try {
            const data = await userAPI.getEvent(eid)
            dispatch({
                type: UserActionType.GET_EVENT,
                payload: data.data
            })
            
        } catch (error) {
            console.log(error)
        }
    }
}

export const joinEventAction = (eid, history) => {
    return async (dispatch) => {
        try {
            const data = await userAPI.joinEvent(eid)
            dispatch({
                type: UserActionType.JOIN_EVENT,
                payload: data.data
            })

            history.go(0)
            
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteEventAction = (eid, history) => {
    return async (dispatch) => {
        try {
            const data = await userAPI.deleteEvent(eid)
            dispatch({
                type: UserActionType.DELETE_EVENT,
                payload: data.data
            })

            history.push(`/events`)
            
        } catch (error) {
            console.log(error)
        }
    }
}

export const getEventsCatalogAction = () => {
    return async (dispatch) => {
        try {
            const data = await userAPI.getEventCatalog();
            dispatch({
                type: UserActionType.GET_ALL_EVENTS,
                payload: data.data
            })
            
        } catch (error) {
            console.log(error)
        }
    }
}


