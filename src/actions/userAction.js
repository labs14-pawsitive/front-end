import axios from 'axios';
import { axiosWithAuth } from 'axiosWithAuth';

export const GET_USER_START = "GET_USER_START";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAIL = "GET_USER_FAIL";


export const get_user = user_id => dispatch => {
    dispatch({ type : GET_USER_START});
    return (
        axiosWithAuth()
        // .get(`${process.env.REACT_APP_BACKEND_URL}/api/users/strict/${user_id}`)
        .get(`http://localhost:8000/api/users/strict/${user_id}`)
        .then( user => {
            dispatch({ type: GET_USER_SUCCESS, payload: user.data })
            console.log(user.data)
        })
        .catch( err => {
            dispatch({ type: GET_USER_FAIL, payload: err})
            console.log(err)
        })
    )
}

export const UPDATE_USER_PROFILE_START = "UPDATE_USER_PROFILE_START";
export const UPDATE_USER_PROFILE_SUCCESS = "UPDATE_USER_PROFILE_SUCCESS";
export const UPDATE_USER_PROFILE_FAIL = "UPDATE_USER_PROFILE_FAIL";


export const update_user_profile = (user_id,userObject) => dispatch => {
    dispatch({ type : UPDATE_USER_PROFILE_START});
    return (
        axiosWithAuth()
        // .get(`${process.env.REACT_APP_BACKEND_URL}/api/users/strict/${user_id}`)
        .put(`http://localhost:8000/api/users/meta/user/${user_id}`, userObject)
        .then( user => {
            dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: user.data })
            console.log('UPDATE_USER_PROFILE_SUCCESS ',user)
        })
        .catch( err => {
            dispatch({ type: UPDATE_USER_PROFILE_FAIL, payload: err})
            console.log(err)
        })
    )
}