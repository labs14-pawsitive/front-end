//initialState set for testing

import {
    GET_USER_START, 
    GET_USER_SUCCESS, 
    GET_USER_FAIL,
    UPDATE_USER_PROFILE_START, 
    UPDATE_USER_PROFILE_SUCCESS, 
    UPDATE_USER_PROFILE_FAIL
} from '../actions/userAction.js'

const initialState = {
    user : {},
    error : "",
    gettingUser : false,
    updatingUser:false
}



export const userReducer = (state = initialState, action) => {
    
    console.log(action.type, action.payload)

    switch(action.type) {
        case GET_USER_START:
            return {
                ...state,
                gettingUser: true,
                error: ""
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                gettingUser: false,
                error: "",
                user: action.payload
            }
        case GET_USER_FAIL:
            return {
                ...state,
                gettingUser: false,
                error: action.payload
            }
            case UPDATE_USER_PROFILE_START:
            return {
                ...state,
                updatingUser: true,
                error: ""
            }
        case UPDATE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                updatingUser: false,
                error: "",
                user: action.payload
            }
        case UPDATE_USER_PROFILE_FAIL:
            return {
                ...state,
                updatingUser: false,
                error: action.payload
            }
        default:
            return state
    }
}
