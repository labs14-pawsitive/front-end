import {
    SEARCH_SPECIES_START,
    SEARCH_SPECIES_SUCCESS,
    SEARCH_SPECIES_ERROR
} from '../actions/mainPageAction.js'

const initialState = {
    speciesSearchResult: [],
    searchingSpecies: false
}

export const mainPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_SPECIES_START:
            return {
                ...state,
                searchingSpecies: true,

            };
        case SEARCH_SPECIES_SUCCESS:
            return {
                ...state,
                searchingSpecies: false,
                speciesSearchResult: action.payload
            };
        case SEARCH_SPECIES_ERROR:
            return {
                ...state,
                searchingSpecies: false,
                error: action.payload
            };
        default:
            return state;
    }
}