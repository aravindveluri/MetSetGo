import RegisterActionType from "../types/registerActionType"

const registerState = {
    isRegistered: false
}
const registerReducer = (state = registerState, action) => {
    switch (action.type) {
        case RegisterActionType.REGISTER_SUCCESS:
            return {
                isRegistered: true,
            }

        case RegisterActionType.REGISTER_FAIL:
            return state
        
        default:
            return state
    }
}

export default registerReducer