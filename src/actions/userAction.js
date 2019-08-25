import axios from 'axios';

export const GET_USER_START = 'GET_USER_START'
    export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
    export const GET_USER_FAILURE = 'GET_USER_FAILURE'

    export const getUser = (userID) => dispatch => {
        
        dispatch({ type: GET_USER_START })
        return axios
          .get(`http://localhost:8000/api/users/${userID}`)
          
          .then(res => {
            dispatch({ type: GET_USER_SUCCESS, payload: res.data })
            console.log('action: get shelter user info', res.data)
          })
          
          .catch(err => {
            dispatch({ type: GET_USER_FAILURE, payload: err.response })
            console.log('action: get shelter user info error: ', err.response)
          })
      }