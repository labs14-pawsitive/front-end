import {
    ADD_NOTES_START,
    ADD_NOTES_SUCCESS,
    ADD_NOTES_FAILURE,
    GET_NOTES_START,
    GET_NOTES_SUCCESS,
    GET_NOTES_FAILURE,
} from '../actions/applicationAction';

const initialState = {
    application_admin: [],
    addingNotes: false,
    gettingNotes: false,
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
        const newState = [...state.application_admin, action.payload]
        return {
            ...state,
            addingNotes: false,
            application_admin: newState
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
            application_admin: action.payload
        };

        case GET_NOTES_FAILURE: 
        return {
            ...state,
            gettingNotes: false,
            error: action.payload
        }

    }
    return state;
}