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
    GET_OPTIONS_START,
    GET_OPTIONS_SUCCESS, 
    GET_OPTIONS_FAILURE,
} from '../actions/applicationAction';
import { statement } from '@babel/template';
import { tumblrColor } from 'assets/jss/material-dashboard-pro-react';

const initialState = {
    notes: [],
    options: [],
    gettingOptions: false,
    addingNotes: false,
    gettingNotes: false,
    deletingNotes: false,
    updatingNotes: false,
    error: '',
};

export const applicationReducer = (state = initialState, action) => {
    switch (action.type) {
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
                gettingNotes: true,
            };

        case GET_NOTES_SUCCESS: 
        console.log(action.payload)
        return {
            ...state,
            gettingNotes: false,
            notes: action.payload
        };

        case GET_NOTES_FAILURE: 
        return {
            ...state,
            gettingNotes: false,
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

            case GET_OPTIONS_START:
                return {
                    ...state,
                    gettingOptions: true,
                }
            
            case GET_OPTIONS_SUCCESS: 
            return {
                ...state,
                gettingOptions: false,
                options: action.payload
            }

            case GET_OPTIONS_FAILURE:
            return {
                ...state,
                gettingOptions: false,
                error: action.payload
            }

    }
    return state;
}