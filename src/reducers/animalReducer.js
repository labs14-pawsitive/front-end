import {
    ADD_ANIMAL_START,
    ADD_ANIMAL_SUCCESS,
    FETCH_OPTIONS_START,
    FETCH_OPTIONS_SUCCESS,
    FETCH_OPTIONS_ERROR,
    UPDATE_BREEDS,
    UPDATE_SIZE,
    UPDATE_SUBSCRIPTIONS,
    UPDATE_COAT_LENGTH,
    UPDATE_AGES,
    UPDATE_APPLICATION_STATUS,
    UPDATE_SPECIES,
    UPDATE_ANIMAL_STATUS,
    UPDATE_ROLES,
    ADD_ANIMAL_ERROR
} from '../actions/animalAction'

const initialState = {
    animalID : null,
    addingAnimal: false,
    fetchingOptions: false,
    updatingBreeds: false,
    updatingSize: false,
    updatingSubscriptions: false,
    updatingCoatLength: false,
    updatingAges: false,
    updatingApplicationStatus: false,
    updatingSpecies: false,
    updatingAnimalStatus: false,
    updatingRoles: false,
    breedsOptions: [],
    sizeOptions: [],
    subscriptionOptions: [],
    coatLengthOptions: [],
    agesOptions: [],
    applicationStatusOptions: [],
    speciesOptions: [],
    animalStatusOptions: [],
    rolesOptions: [],
    error: ''
}

export const animalReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_ANIMAL_START:
            return {
                ...state,
                addingAnimal: true,
                
            };
        case ADD_ANIMAL_SUCCESS:
            return {
                ...state,
                addingAnimal: false
            };
        case ADD_ANIMAL_ERROR:
            return {
                ...state,
                addingAnimal: false,
                error: action.payload
            };
        case FETCH_OPTIONS_START:
            return {
                ...state,
                fetchingOptions: true
            };
        case FETCH_OPTIONS_SUCCESS:
            return {
                ...state,
                fetchingOptions: false,
                options: action.payload
            };
        case FETCH_OPTIONS_ERROR:
            return {
                ...state,
                fetchingOptions: false,
                error: action.payload
            };
        case UPDATE_BREEDS:
            return {
                ...state,
                updatingBreeds: true,
                breedsOptions: action.payload
            };
        case UPDATE_SIZE:
            return {
                ...state,
                updatingSize: true,
                sizeOptions: action.payload
            };
        case UPDATE_SUBSCRIPTIONS:
            return {
                ...state,
                updatingSubscriptions: true,
                subscriptionsOptions: action.payload
            };
        case UPDATE_COAT_LENGTH:
            return {
                ...state,
                updatingCoatLength: true,
                coatLengthOptions: action.payload
            };
        case UPDATE_AGES:
            return {
                ...state,
                updatingAges: true,
                agesOptions: action.payload
            };
        case UPDATE_APPLICATION_STATUS:
            return {
                ...state,
                updatingApplicationStatus: true,
                applicationStatusOptions: action.payload
            };
        case UPDATE_SPECIES:
            return {
                ...state,
                updatingSpecies: true,
                speciesOptions: action.payload
            };
        case UPDATE_ANIMAL_STATUS:
            return {
                ...state,
                updatingAnimalStatus: true,
                animalStatusOptions: action.payload
            };
        case UPDATE_ROLES:
            return {
                ...state,
                updatingRoles: true,
                rolesOptions: action.payload
            };
        default: 
            return state;
    }
}

export default animalReducer;