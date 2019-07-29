import {
    GET_SHELTER_START,
    GET_SHELTER_SUCCESS,
    GET_SHELTER_ERR,
    GET_OPTIONS_START,
    GET_OPTIONS_SUCCESS,
    GET_OPTIONS_ERR,
    ADD_SHELTERLOC_START,
    ADD_SHELTERLOC_SUCCESS,
    ADD_SHELTERLOC_ERR,
    ADD_CONTACT_START,
    ADD_CONTACT_SUCCESS,
    ADD_CONTACT_ERR,

} from '../actions/shelterAction'


//initialState set for testing
const initialState = {
    shelterID : 3,
    upgraded : true,
    shelter: {},
    stateOptions: [],
    contactOptions: [],
    fetchingShelter: false,
    fetchingOptions: false,
    addingLocation: false,
    addingContact: false,
    error: '',
}

export const shelterReducer = (state = initialState, action) => {
    switch(action.type) {
        //----Getting Shelter Information
        case GET_SHELTER_START:
            return {
                ...state,
                fetchingShelter: true
            }
        case GET_SHELTER_SUCCESS:
            return {
                ...state,
                fetchingShelter: false,
                shelter: action.payload
            }
        case GET_SHELTER_ERR:
            return {
                ...state,
                fetchingShelter: false,
                error: action.payload
            }
        //-----Getting Options Information
        case GET_OPTIONS_START:
            return {
                ...state,
                fetchingOptions: true
            }
        case GET_OPTIONS_SUCCESS:
            return {
                ...state,
                fetchingOptions: false,
                stateOptions: action.payload.states,
                contactOptions: action.payload.contacts,
            }
        case GET_OPTIONS_ERR:
            return {
                ...state,
                fetchingOptions: false,
                error: action.payload
            }
        //----Adding Location
        case ADD_SHELTERLOC_START:
            return {
                ...state,
                addingLocation: true,
            }
        case ADD_SHELTERLOC_SUCCESS:
            return {
                ...state,
                addingLocation: true,
            }
        case ADD_SHELTERLOC_ERR:
            return {
                ...state,
                addingLocation: false,
                error: action.payload
            }

        //----Adding Contact
        case ADD_CONTACT_START: 
            return {
                ...state,
                addingContact: false,
            }
        case ADD_CONTACT_SUCCESS:
            return {
                ...state,
                addingContact: true,
            }
        case ADD_CONTACT_ERR:
            return {
                ...state,
                addingContact: false,
                error: action.payload
            }

        default: return state;
    }
}