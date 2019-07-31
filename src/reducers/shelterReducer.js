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
    UPDATE_CONTACT_START,
    UPDATE_CONTACT_SUCCESS,
    UPDATE_CONTACT_ERR,
    UPDATE_SHELTERLOC_START,
    UPDATE_SHELTERLOC_SUCCESS,
    UPDATE_SHELTERLOC_ERR,
    DELETE_CONTACT_START,
    DELETE_CONTACT_SUCCESS,
    DELETE_CONTACT_ERR,
    DELETE_SHELTERLOC_START,
    DELETE_SHELTERLOC_SUCCESS,
    DELETE_SHELTERLOC_ERR,
    

} from '../actions/shelterAction'


//initialState set for testing
const initialState = {
    shelterID : 3,
    upgraded : true,
    shelter: {},
    location: [],
    contacts: [],
    stateOptions: [],
    contactOptions: [],
    fetchingShelter: false,
    fetchingOptions: false,
    addingLocation: false,
    addingContact: false,
    updatingLocation: false,
    updatingContact: false,
    deletingLocation: false,
    deletingContact: false,
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
                shelter: action.payload,
                location: action.payload.location,
                contacts: action.payload.contacts,
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

        //----Updating Location
        case UPDATE_SHELTERLOC_START:
            return {
                ...state,
                updatingLocation:true
            }
        case UPDATE_SHELTERLOC_SUCCESS:
            return {
                ...state,
                updatingLocation: false
            }
        case UPDATE_SHELTERLOC_ERR:
            return {
                ...state,
                updatingLocation: false,
                error: action.payload
            }

        //----Deleting Location:
        case DELETE_SHELTERLOC_START:
            return {
                ...state,
                deletingLocation: true
            }
        case DELETE_SHELTERLOC_SUCCESS:
            return {
                ...state,
                deletingLocation: false
            }
        case DELETE_SHELTERLOC_ERR:
            return {
                ...state,
                deletingLocation: false,
                error: action.payload,
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
        //----Updating Contact
        case UPDATE_CONTACT_START:
            return {
                ...state,
                updatingContact:true
            }
        case UPDATE_CONTACT_SUCCESS:
            return {
                ...state,
                // shelter: action.payload,
                // location: action.payload.location,
                // contacts: action.payload.contacts,
                updatingContact: false
            }
        case UPDATE_CONTACT_ERR:
            return {
                ...state,
                updatingContact: false,
                error: action.payload
            }
        //----Deleting Contact:
        case DELETE_CONTACT_START:
            return {
                ...state,
                deletingContact: true
            }
        case DELETE_CONTACT_SUCCESS:
            return {
                ...state,
                deletingContact: false
            }
        case DELETE_CONTACT_ERR:
            return {
                ...state,
                deletingContact: false,
                error: action.payload,
            }
        default: return state;
    }
}