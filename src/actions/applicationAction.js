import axios from 'axios';
// axios.defaults.withCredentials = true;

export const GET_APP_START = 'GET_APP_START';
export const GET_APP_SUCCESS = 'GET_APP_SUCCESS';
export const GET_APP_FAILURE = 'GET_APP_FAILURE';

export const getApplication = ( id ) => dispatch => {
    dispatch({ type: GET_APP_START });
    return axios
    .get(`https://staging1-pawsnfind.herokuapp.com/api/applications/${id}`)
    .then(res => {
        dispatch({ type: GET_APP_SUCCESS, payload: res.data })
    })
    .catch(err => {
        dispatch({ type: GET_APP_FAILURE, payload: err.response })
    })
};

export const UPDATE_APP_START = 'UPDATE_APP_START';
export const UPDATE_APP_SUCCESS = 'UPDATE_APP_SUCCESS';
export const UPDATE_APP_FAILURE = 'UPDATE_APP_FAILURE';

export const updateApplication = ( updatedStatus, id ) => dispatch => {
    dispatch({ type: UPDATE_APP_START });
    return axios
    .put(`https://staging1-pawsnfind.herokuapp.com/api/applications/${id}/status`, updatedStatus )
    .then(res => {
        console.log(res);
        dispatch({ type: UPDATE_APP_SUCCESS, payload: res.data })
    })
    .catch(err => {
        dispatch({ type: UPDATE_APP_FAILURE, payload: err.response })
    })
};

export const ADD_NOTES_START = 'ADD_NOTES_START';
export const ADD_NOTES_SUCCESS = 'ADD_NOTES_SUCCESS';
export const ADD_NOTES_FAILURE = 'ADD_NOTES_FAILURE';

export const addNotes = ( newNote, id ) => dispatch => {
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
};

export const GET_NOTES_START = 'GET_NOTES_START';
export const GET_NOTES_SUCCESS = 'GET_NOTES_SUCCESS';
export const GET_NOTES_FAILURE = 'GET_NOTES_FAILURE';

export const getNotes = id => dispatch => {
    dispatch({ type: GET_NOTES_START })
    return axios
        .get(`https://staging1-pawsnfind.herokuapp.com/api/applications/${id}/notes`)
        .then(res => {
            console.log(res)
            dispatch({ type: GET_NOTES_SUCCESS, payload: res.data })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: GET_NOTES_FAILURE, payload: err.response })
        })
};

export const DELETE_NOTES_START = 'DELETE_NOTES_START';
export const DELETE_NOTES_SUCCESS = 'DELETE_NOTES_SUCCESS';
export const DELETE_NOTES_FAILURE = 'DELETE_NOTES_FAILURE';

export const deleteNotes = id => dispatch => {
    dispatch({ type: DELETE_NOTES_START })
    return axios
    .delete(`https://staging1-pawsnfind.herokuapp.com/api/applications/note/${id}`)
    .then(res => {
        dispatch({ type: DELETE_NOTES_SUCCESS, payload: id })
    })
    .catch(err => {
        dispatch({ type: DELETE_NOTES_FAILURE, payload: err.response })
    })
};

export const UPDATE_NOTES_START = 'UPDATE_NOTES_START';
export const UPDATE_NOTES_SUCCESS = 'UPDATE_NOTES_SUCCESS';
export const UPDATE_NOTES_FAILURE = 'UPDATE_NOTES_FAILURE';

export const updateNotes = ( updatedNote, id ) => dispatch => {
    dispatch({ type: UPDATE_NOTES_START })
    return axios 
    .put(`https://staging1-pawsnfind.herokuapp.com/api/applications/note/${id}`, updatedNote )
    .then(res => {
        console.log(res)
        dispatch({ type: UPDATE_NOTES_SUCCESS, payload: res.data })
    })
    .catch(err => {
        dispatch({ type: UPDATE_NOTES_FAILURE, payload: err.response })
    })
};

export const GET_OPTIONS_START = 'GET_OPTIONS_START';
export const GET_OPTIONS_SUCCESS = 'GET_OPTIONS_SUCCESS';
export const GET_OPTIONS_FAILURE = 'GET_OPTIONS_FAILURE';

export const getOptions = id => dispatch => {
    dispatch({ type: GET_OPTIONS_START })
    return axios
    .get(`https://staging1-pawsnfind.herokuapp.com/api/internal/paws/options/:id`)
    .then(res => {
        console.log(res)
        dispatch({ type: GET_OPTIONS_SUCCESS, payload: res.data })
    })
    .catch(err => {
        dispatch({ type: GET_OPTIONS_FAILURE, payload: err.response })
    })
};