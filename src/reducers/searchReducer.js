//initialState set for testing
import {
    SEARCH_OPTION_START,
    SEARCH_OPTION_SUCCESS,
    SEARCH_OPTION_ERROR,
    UPDATE_DISPLAYED_ANIMALS_START,
    UPDATE_DISPLAYED_ANIMALS_SUCCESS,
    UPDATE_DISPLAYED_ANIMALS_ERROR
} from '../actions/searchAction'

const initialState = {
    searchSelections: {
        breed_ids: [],
        species_ids: [],
        is_male: false,
        size_ids: [],
        age_ids: [],
        coatLength_ids: [],
        zipcode: 0
    },
    displayedAnimals: [],
    error: '',
    updatingSearchOptions: false,
    updatingDisplayedAnimals: false
}

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_OPTION_START:
            return {
                ...state,
                updatingSearchOptions: true,

            };
        case SEARCH_OPTION_SUCCESS:
            return {
                ...state,
                updatingSearchOptions: false,
                searchSelections: {
                    ...state.searchSelections,
                    [action.payload.optionName]: action.payload.value
                }
            };
        case SEARCH_OPTION_ERROR:
            return {
                ...state,
                updatingSearchOptions: false,
                error: action.payload
            }
        case UPDATE_DISPLAYED_ANIMALS_START:
            return {
                ...state,
                updatingDisplayedAnimals: true,
            }
        case UPDATE_DISPLAYED_ANIMALS_SUCCESS:
            return {
                ...state,
                updatingDisplayedAnimals: false,
                displayedAnimals: action.payload.animals
            }
        case UPDATE_DISPLAYED_ANIMALS_ERROR:
            return {
                ...state,
                updatingDisplayedAnimals: false,
                error: action.payload
            }
        default: 
            return state
    }
}