//initialState set for testing
import {
    GET_USER_START,
    GET_USER_SUCCESS,
    GET_USER_FAILURE
} from '../actions/userAction'

const initialState = {
    gettingUser:false,
    userInfo: {}
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_START:
            return {
                ...state,
                gettingUser: true,

            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                gettingUser: false,
                userInfo:action.payload
            };
        case GET_USER_FAILURE:
            return {
                ...state,
                gettingUser: false,
                error: action.payload
            };
        default:
            return state
    }
}