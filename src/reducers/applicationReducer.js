import {
    ADD_NOTES_START,
    ADD_NOTES_SUCCESS,
    ADD_NOTES_FAILURE,
    GET_NOTES_START,
    GET_NOTES_SUCCESS,
    GET_NOTES_FAILURE,
    DELETE_NOTES_START, 
    DELETE_NOTES_SUCCESS,
    DELETE_NOTES_FAILURE,
    UPDATE_NOTES_START,
    UPDATE_NOTES_SUCCESS,
    UPDATE_NOTES_FAILURE,
    FETCH_OPTIONS_START,
    FETCH_OPTIONS_SUCCESS, 
    FETCH_OPTIONS_FAILURE,
    FETCH_APP_START,
    FETCH_APP_SUCCESS,
    FETCH_APP_FAILURE,
    UPDATE_APP_STATUS_START,
    UPDATE_APP_STATUS_SUCCESS,
    UPDATE_APP_STATUS_FAILURE,
} from '../actions/applicationAction';
// import { statement } from '@babel/template';
// import { tumblrColor } from 'assets/jss/material-dashboard-pro-react';

const initialState = {
    application: {},
    notes: [],
    options: [],
    fetchingApplication: false,
    fetchingOptions: false,
    updatingStatus: false,
    addingNotes: false,
    fetchingNotes: false,
    deletingNotes: false,
    updatingNotes: false,
    error: '',
};

export const applicationReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_APP_START:
        return {
            ...state,
            fetchingApplication: true,
        }

        case FETCH_APP_SUCCESS: 

        const oddState = {
            ...state,
            fetchingApplication: false,
            application: action.payload,
        }

        console.log(oddState)
        return oddState

        case FETCH_APP_FAILURE: 
        return {
            ...state,
            fetchingApplication: false,
            error: action.payload
        }

        case UPDATE_APP_STATUS_START:
            return {
                ...state, 
                updatingStatus: true,
                error: '',
            };

        case UPDATE_APP_STATUS_SUCCESS: 
        return {
            ...state, 
            updatingStatus: false,
            application: action.payload,
            error: '',
        };

        case UPDATE_APP_STATUS_FAILURE: 
        return {
            ...state,
            updatingStatus: false,
            error: action.payload,
        };

        case ADD_NOTES_START:
        return {
            ...state,
            addingNotes: true
        };

        case ADD_NOTES_SUCCESS: 
        const newState = [...state.notes, action.payload]
        return {
            ...state,
            addingNotes: false,
            notes: newState
        };

        case ADD_NOTES_FAILURE: 
        return {
            ...state,
            addingNotes: false,
            error: action.payload
        }

        case GET_NOTES_START:
            return {
                ...state,
                fetchingNotes: true,
            };

        case GET_NOTES_SUCCESS: 
        return {
            ...state,
            fetchingNotes: false,
            notes: action.payload
        };

        case GET_NOTES_FAILURE: 
        return {
            ...state,
            fetchingNotes: false,
            error: action.payload
        }

        case DELETE_NOTES_START:
            return {
                ...state, 
                deletingNotes: true,
            }

        case DELETE_NOTES_SUCCESS: 
            return {
                ...state,
                deletingNotes: false,
                notes: state.notes.filter( note => note.id !== action.payload )
            }

        case DELETE_NOTES_FAILURE: 
            return {
                ...state,
                deletingNotes: false,
                error: action.payload
            }

        case UPDATE_NOTES_START: 
            return {
                ...state,
                updatingNotes: true,
            }

        case UPDATE_NOTES_SUCCESS: 
            return {
                ...state,
                updatingNotes: false,
 
            }

        case UPDATE_NOTES_FAILURE: 
            return {
                ...state,
                updatingNotes: false,
                error: action.payload
            }

        case FETCH_OPTIONS_START:
            return {
             ...state,
             fetchingOptions: true,
            }
            
        case FETCH_OPTIONS_SUCCESS: 
        console.log(action.payload)
            return {
                ...state,
                fetchingOptions: false,
                options: action.payload.application_status
            }

        case FETCH_OPTIONS_FAILURE:
            return {
                ...state,
                fetchingOptions: false,
                error: action.payload
            }

    }
    console.log()
    return state;
}