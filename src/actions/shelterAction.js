import axios from 'axios';

//Fetch individual shelter for front and back
export const GET_SHELTER_START = 'GET_SHELTER_START';
export const GET_SHELTER_SUCCESS = 'GET_SHELTER_SUCCESS';
export const GET_SHELTER_ERR = 'GET_SHELTER_ERROR';

export const fetchShelter = shelterID => dispatch => {
    dispatch({ type: GET_SHELTER_START })
    return axios

    
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/shelters/${shelterID}`)

    .then(res => {
        dispatch({ type: GET_SHELTER_SUCCESS, payload: res.data })
    })
    .catch(err => {
        dispatch({ type: GET_SHELTER_ERR, payload: err.response })
    })
}

//===============Shelter Management=========================

export const GET_OPTIONS_START = 'GET_OPTIONS_START';
export const GET_OPTIONS_SUCCESS = 'GET_OPTIONS_SUCCESS';
export const GET_OPTIONS_ERR = 'GET_OPTIONS_ERR';

export const fetchOptions = (shelterID) => dispatch => {
    dispatch({ type: GET_OPTIONS_START })
    return axios
    .get(`http://localhost:8000/api/internal/paws/options/${shelterID}`)
    .then(res => {
        dispatch({ type: GET_OPTIONS_SUCCESS, payload: res.data })
        console.log('Where is it?', res.data)
    })
    .catch(err => {
        dispatch({ type: GET_OPTIONS_ERR, payload: err.response })
    })
}

//add a location for shelter
export const ADD_SHELTERLOC_START = 'ADD_SHELTERLOC_START';
export const ADD_SHELTERLOC_SUCCESS = 'ADD_SHELTERLOC_SUCCESS';
export const ADD_SHELTERLOC_ERR = 'ADD_SHELTERLOC_ERROR';

export const addShelterLoc = (shelterID, location) => dispatch => {
    dispatch({ type: ADD_SHELTERLOC_START })
    return axios
    .post(`http://localhost:8000/api/shelters/${shelterID}/location`, location)
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
    dispatch({ type: UPDATE_SHELTERLOC_START })
    return axios
    .put(`http://localhost:8000/api/shelters/location/${locationId}`, updatedChange)
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
    dispatch({ type: DELETE_SHELTERLOC_START })
    return axios
    .delete(`http://localhost:8000/api/shelters/location/${locationId}`, locationId)
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

export const addShelterCon = (shelterID, contact) => dispatch => {
    dispatch({ type: ADD_CONTACT_START })
    return axios
    .post(`http://localhost:8000/api/shelters/${shelterID}/contact`, contact)
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
    dispatch({ type: UPDATE_CONTACT_START })
    return axios
    .put(`http://localhost:8000/api/shelters/contact/${contactId}`, change)
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
    dispatch({ type: DELETE_CONTACT_START })
    return axios
    .delete(`http://localhost:8000/api/shelters/contact/${contactId}`, contactId)
    .then(res => {
        dispatch({ type: DELETE_CONTACT_SUCCESS, payload: res.data })
    })
    .catch(err => {
        dispatch({ type: DELETE_CONTACT_ERR, payload: err.response })
    })
}