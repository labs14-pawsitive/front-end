import axios from 'axios';
// axios.defaults.withCredentials = true;

export const ADD_NOTES_START = 'ADD_NOTES_START';
export const ADD_NOTES_SUCCESS = 'ADD_NOTES_SUCCESS';
export const ADD_NOTES_FAILURE = 'ADD_NOTES_FAILURE';

export const addNotes = (newNote, id) => dispatch => {
    dispatch({ type: ADD_NOTES_START });
    return axios
        .post(`https://staging1-pawsnfind.herokuapp.com/api/applications/${id}/note`, newNote )
        .then(res => {
            console.log(res);
            dispatch({ type: ADD_NOTES_SUCCESS, payload: res.data })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: ADD_NOTES_FAILURE, payload: err.response })
        })
}

export const GET_NOTES_START = 'GET_NOTES_START';
export const GET_NOTES_SUCCESS = 'GET_NOTES_SUCCESS';
export const GET_NOTES_FAILURE = 'GET_NOTES_FAILURE';

export const getNotes = (id, shelterUserId) => dispatch => {
    dispatch({ type: GET_NOTES_START })
    return axios
        .get(`https://staging1-pawsnfind.herokuapp.com/api/applications/${id}/admin/${shelterUserId}`)
        .then(res => {
            dispatch({ type: GET_NOTES_SUCCESS, payload: res.data })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: GET_NOTES_FAILURE, payload: err.response })
        })
}