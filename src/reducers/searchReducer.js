//initialState set for testing
import {
    SEARCH_OPTION_START,
    SEARCH_OPTION_SUCCESS,
    SEARCH_OPTION_ERROR,
    UPDATE_DISPLAYED_ANIMALS_START,
    UPDATE_DISPLAYED_ANIMALS_SUCCESS,
    UPDATE_DISPLAYED_ANIMALS_ERROR, 
    UPDATE_DISPLAYED_PAGINATION_DETAILS,
    PAGINATION_OPTION_START,
    PAGINATION_OPTION_SUCCESS,
} from '../actions/searchAction'


//home page initial search

import {
    SEARCH_SPECIES_START,
    SEARCH_SPECIES_SUCCESS,
    SEARCH_SPECIES_ERROR
} from '../actions/mainPageAction.js'


const initialState = {
    searchSelections: {
        breed_ids: [],
        species_ids: [],
        is_male: [],
        size_ids: [],
        age_ids: [],
        coatLength_ids: [],
        zipcode: null,
        radius: []
    },
    displayedAnimals: [],
    error: '',
    updatingSearchOptions: false,
    updatingDisplayedAnimals: false,
    paginationDetails: {
        totalCount: 1,
        currentPage: 1,
        display: 10
    },
    updatingDisplayedPaginationDetails: false,
    updatingPaginationOption: false,

    initialSearch: false,
    initialError: ''
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
        case UPDATE_DISPLAYED_PAGINATION_DETAILS:
            return {
                ...state,
                updatingDisplayedPaginationDetails: false,
                paginationDetails: {
                    ...state.paginationDetails,
                    ...action.payload.paginationDetails
                }
            }
        case UPDATE_DISPLAYED_ANIMALS_ERROR:
            return {
                ...state,
                updatingDisplayedAnimals: false,
                error: action.payload
            }
        case PAGINATION_OPTION_START:
            return {
                ...state,
                updatingPaginationOption: true,
            }
        case PAGINATION_OPTION_SUCCESS:
            const detail = { [action.payload.optionName]: action.payload.value }
            return {
                ...state,
                updatingPaginationOption: false,
                paginationDetails: {
                    ...state.paginationDetails,
                    ...detail
                }
            }
        
            //main page search
          case SEARCH_SPECIES_START:
                    //console.log('reducers action for SEARCH_SPECIES_START ', action)
                    return {
                        ...state,
                        initialSearch: true,
                        displayedAnimals: [],
                        initialError: ''
        
                    };
                case SEARCH_SPECIES_SUCCESS:
        
                        console.log('reducers action for SEARCH_SPECIES_SUCCESS ', action.initialSearchForm)
                    return {
                        ...state,
                        initialSearch: false,
                        //displayedAnimals: action.payload,
                       
                    };
                case SEARCH_SPECIES_ERROR:
                    return {
                        ...state,
                        initialSearch: false,
                        initialError: action.payload
                    };

           
        default: 
            return state
    }
}

