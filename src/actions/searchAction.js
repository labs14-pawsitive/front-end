import axios from 'axios';

export const SEARCH_OPTION_START = 'SEARCH_OPTION_START';
export const SEARCH_OPTION_SUCCESS = 'SEARCH_OPTION_SUCCESS';
export const SEARCH_OPTION_ERROR = 'SEARCH_OPTION_ERROR';
export const updateSearchOption = (changedAttribute, value) => dispatch => {
    dispatch({ type: SEARCH_OPTION_START});

    const payload = {
        optionName: changedAttribute,
        value: value
    }
    dispatch ({type: SEARCH_OPTION_SUCCESS, payload: payload})
}

export const UPDATE_DISPLAYED_ANIMALS_START = 'DISPLAYED_ANIMALS_START';
export const UPDATE_DISPLAYED_ANIMALS_SUCCESS = 'UPDATE_DISPLAYED_ANIMALS_SUCCESS';
export const UPDATE_DISPLAYED_ANIMALS_ERROR = 'UPDATE_DISPLAYED_ANIMALS_ERROR';
export const UPDATE_DISPLAYED_PAGINATION_DETAILS = 'UPDATE_DISPLAYED_PAGINATION_DETAILS'
export const updateDisplayedAnimals = (options={}) => dispatch => {
    dispatch({ type: UPDATE_DISPLAYED_ANIMALS_START})

    let searchObj = {
        ...options
    }
 
    return axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/api/search/advancedSearch`, searchObj)
    .then(res => {
        dispatch({ type: UPDATE_DISPLAYED_ANIMALS_SUCCESS, payload: {animals: res.data.animals}})
        dispatch({ type: UPDATE_DISPLAYED_PAGINATION_DETAILS, payload: {paginationDetails: res.data.paginationDetails}})
    })
    .catch(err => {
        dispatch({type: UPDATE_DISPLAYED_ANIMALS_ERROR, payload: err.response})
    })
}

export const PAGINATION_OPTION_START = 'PAGINATION_OPTION_START';
export const PAGINATION_OPTION_SUCCESS = 'PAGINATION_OPTION_SUCCESS';
export const updatePaginationOption = (changedAttribute, value) => dispatch => {
    dispatch({ type: PAGINATION_OPTION_START});

    const payload = {
        optionName: changedAttribute,
        value: value
    }
    dispatch ({type: PAGINATION_OPTION_SUCCESS, payload: payload})
}