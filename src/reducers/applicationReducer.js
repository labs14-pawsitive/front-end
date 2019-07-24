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
} from '../actions/applicationAction';

const initialState = {
    notes: [],
    addingNotes: false,
    gettingNotes: false,
    deletingNotes:false,
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

    }
    return state;
}