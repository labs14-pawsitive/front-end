

import {GET_USER_START, GET_USER_SUCCESS, GET_USER_FAIL} from '../actions/userAction.js'

const initialState = {
    user : {},
   userInfo: {}
    error : "",
    gettingUser : false,

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
        default:
            return state
    }

}
