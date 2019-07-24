import axios from 'axios';

//Fetch individual shelter
export const GETSHELTER_START = 'GETSHELTER_START';
export const GETSHELTER_SUCCESS = 'GETSHELTER_SUCCESS';
export const GETSHELTER_ERR = 'GETSHELTER_ERROR';

export const fetchShelter = id => dispatch => {
    dispatch({ GETSHELTER_START })
    return axios
    .get(`https://staging1-pawsnfind.herokuapp.com/api/shelters/${id}`)
    .then(res => {
        dispatch({ type: GETSHELTER_SUCCESS, payload: res.data })
    })
    .catch(err => {
        dispatch({ type: GETSHELTER_ERR, payload: err.response })
    })
}

//add a location for shelter
export const ADD_SHELTERLOC_START = 'ADD_SHELTERLOC_START';
export const ADD_SHELTERLOC_SUCCESS = 'ADD_SHELTERLOC_SUCCESS';
export const ADD_SHELTERLOC_ERR = 'ADD_SHELTERLOC_ERROR';

export const addShelterLoc = (id, location) => dispatch => {
    dispatch({ ADD_SHELTERLOC_START })
    return axios
    .post(`https://staging1-pawsnfind.herokuapp.com/api/shelters/${id}/location`, location)
    .then(res => {
        dispatch({ type: ADD_SHELTERLOC_SUCCESS, payload: res.data })
    })
    .catch(err => {
        dispatch({ type: ADD_SHELTERLOC_ERR, payload: err.response })
    })
}

//update a location for shelter
export const UPDATE_SHELTERLOC_START = 'UPDATE_SHELTERLOC_START';
export const UPDATE_SHELTERLOC_SUCCESS = 'UPDATE_SHELTERLOC_SUCCESS';
export const UPDATE_SHELTERLOC_ERR = 'UPDATE_SHELTERLOC_ERROR';

export const updateShelterLoc = (locationId, updatedChange) => dispatch => {
    dispatch({ UPDATE_SHELTERLOC_START })
    return axios
    .put(`https://staging1-pawsnfind.herokuapp.com/api/shelters/location/${locationId}`, updatedChange)
    .then(res => {
        dispatch({ type: UPDATE_SHELTERLOC_SUCCESS, payload: res.data })
    })
    .catch(err => {
        dispatch({ type: UPDATE_SHELTERLOC_ERR, payload: err.response })
    })
}

//delete a location for shelter
export const DELETE_SHELTERLOC_START = 'DELETE_SHELTERLOC_START';
export const DELETE_SHELTERLOC_SUCCESS = 'DELETE_SHELTERLOC_SUCCESS';
export const DELETE_SHELTERLOC_ERR = 'DELETE_SHELTERLOC_ERROR';

export const deleteShelterLoc = locationId => dispatch => {
    dispatch({ DELETE_SHELTERLOC_START })
    return axios
    .put(`https://staging1-pawsnfind.herokuapp.com/api/shelters/location/${locationId}`, locationId)
    .then(res => {
        dispatch({ type: DELETE_SHELTERLOC_SUCCESS, payload: res.data })
    })
    .catch(err => {
        dispatch({ type: DELETE_SHELTERLOC_ERR, payload: err.response })
    })
}

//add a contact for shelter
export const ADD_CONTACT_START = 'ADD_CONTACT_START';
export const ADD_CONTACT_SUCCESS = 'ADD_CONTACT_SUCCESS';
export const ADD_CONTACT_ERR = 'ADD_CONTACT_ERROR';

export const addShelterCon = (id, contact) => dispatch => {
    dispatch({ ADD_CONTACT_START })
    return axios
    .post(`https://staging1-pawsnfind.herokuapp.com/api/shelters/${id}/contact`, contact)
    .then(res => {
        dispatch({ type: ADD_CONTACT_SUCCESS, payload: res.data })
    })
    .catch(err => {
        dispatch({ type: ADD_CONTACT_ERR, payload: err.response })
    })
}

//update a contact for shelter
export const UPDATE_CONTACT_START = 'UPDATE_CONTACT_START';
export const UPDATE_CONTACT_SUCCESS = 'UPDATE_CONTACT_SUCCESS';
export const UPDATE_CONTACT_ERR = 'UPDATE_CONTACT_ERROR';

export const updateShelterCon = (contactId, change) => dispatch => {
    dispatch({ UPDATE_CONTACT_START })
    return axios
    .put(`https://staging1-pawsnfind.herokuapp.com/api/shelters/contact/${contactId}`, change)
    .then(res => {
        dispatch({ type: UPDATE_CONTACT_SUCCESS, payload: res.data })
    })
    .catch(err => {
        dispatch({ type: UPDATE_CONTACT_ERR, payload: err.response })
    })
}

//delete a location for shelter
export const DELETE_CONTACT_START = 'DELETE_CONTACT_START';
export const DELETE_CONTACT_SUCCESS = 'DELETE_CONTACT_SUCCESS';
export const DELETE_CONTACT_ERR = 'DELETE_CONTACT_ERROR';

export const deleteShelterCon = contactId => dispatch => {
    dispatch({ DELETE_CONTACT_START })
    return axios
    .put(`https://staging1-pawsnfind.herokuapp.com/api/shelters/location/${contactId}`, contactId)
    .then(res => {
        dispatch({ type: DELETE_CONTACT_SUCCESS, payload: res.data })
    })
    .catch(err => {
        dispatch({ type: DELETE_CONTACT_ERR, payload: err.response })
    })
}