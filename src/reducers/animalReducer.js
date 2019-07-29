import {
    EDIT_ANIMAL_INFO_START,
    EDIT_ANIMAL_INFO_SUCCESS,
    EDIT_ANIMAL_INFO_FAILURE,
    GET_DROPDOWN_START,
    GET_DROPDOWN_SUCCESS,
    GET_DROPDOWN_FAILURE,
    GET_ANIMAL_START,
    GET_ANIMAL_SUCCESS,
    GET_ANIMAL_FAILURE,
    POST_NOTES_START,
    POST_NOTES_SUCCESS,
    POST_NOTES_FAILURE,
    UPDATE_NOTES_START,
    UPDATE_NOTES_SUCCESS,
    UPDATE_NOTES_FAILURE,
    DELETE_NOTES_START,
    DELETE_NOTES_SUCCESS,
    DELETE_NOTES_FAILURE
} from '../actions/animalAction.js'

const initialState = {
    animalID: null,
    animalInfo: null,
    dropdownAnimalOptions: {
        size: [],
        breeds: [],
        coat_length: [],
        subscriptions: [],
        ages: [],
        application_status: [],
        species: [],
        animal_status: [],
        roles: [],
        states: [],
        locations: [],
        contacts: [],
    },
    animalInfo: {
        animal: [],
        animalMeta: [],
        animalNotes: [],
        animalFollowers: []
    },
    updatingAnimalInfo: false,
    gettingDropdownOptions: false,
    gettingAnimalInfo: false,
    addingNotes: false,
    updatingNotes: false,
    deletingNotes: false,
}

export const animalReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DROPDOWN_START:
            return {
                ...state,
                gettingDropdownOptions: true,
                error: ''
            };
        case GET_DROPDOWN_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                gettingDropdownOptions: false,
                dropdownAnimalOptions: {
                    size: action.payload.size,
                    breeds: action.payload.breeds,
                    coat_length: action.payload.coat_length,
                    subscriptions: action.payload.subscriptions,
                    ages: action.payload.ages,
                    application_status: action.payload.application_status,
                    species: action.payload.species,
                    animal_status: action.payload.animal_status,
                    roles: action.payload.roles,
                    states: action.payload.states,
                    locations: action.payload.locations,
                    contacts: action.payload.contacts
                },
                error: ''
            };
        case GET_DROPDOWN_FAILURE:
            return {
                ...state,
                gettingDropdownOptions: false,
                error: action.payload
            };
        case GET_ANIMAL_START:
            return {
                ...state,
                gettingAnimalInfo: true,
                error: ''
            };
        case GET_ANIMAL_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                gettingAnimalInfo: false,
                animalInfo: {
                    animal: action.payload,
                    animalMeta: action.payload.meta,
                    animalNotes: action.payload.notes,
                    animalFollowers: action.payload.followers
                },
                error: ''
            };
        case GET_ANIMAL_FAILURE:
            return {
                ...state,
                gettingAnimalInfo: false,
                error: action.payload
            };
        case EDIT_ANIMAL_INFO_START:
            return {
                ...state,
                updatingAnimalInfo: true,
                error: ''
            };
        case EDIT_ANIMAL_INFO_SUCCESS:
            console.log('EDIT_ANIMAL_INFO_SUCCESS: action payload:  ', action.payload)
            return {
                ...state,
                updatingAnimalInfo: false,
                animalInfo: {
                    ...state.animalInfo,
                    animal: action.payload,
                    animalMeta: action.payload.meta,
                    animalNotes: action.payload.notes,
                    animalFollowers: action.payload.followers
                },
                error: ''
            };
        case EDIT_ANIMAL_INFO_FAILURE:
            return {
                ...state,
                updatingAnimalInfo: false,
                error: action.payload
            };
        case POST_NOTES_START:
            return {
                ...state,
                addingNotes: true,
                error: ''
            };
        case POST_NOTES_SUCCESS:
            console.log('POST_NOTES_SUCCESS: action payload:  ', action.payload)
            return {
                ...state,
                addingNotes: false,
                animalInfo: {
                    ...state.animalInfo,
                    animal: action.payload,
                    animalMeta: action.payload.meta,
                    animalNotes: action.payload.notes,
                    animalFollowers: action.payload.followers
                },
                error: ''
            };
        case POST_NOTES_FAILURE:
            return {
                ...state,
                addingNotes: false,
                error: action.payload
            };
        case UPDATE_NOTES_START:
            return {
                ...state,
                updatingNotes: true,
                error: ''
            };
        case UPDATE_NOTES_SUCCESS:
            console.log('UPDATE_NOTES_SUCCESS: action payload:  ', action.payload)
            return {
                ...state,
                updatingNotes: false,
                animalInfo: {
                    ...state.animalInfo,
                    animal: action.payload,
                    animalMeta: action.payload.meta,
                    animalNotes: action.payload.notes,
                    animalFollowers: action.payload.followers
                },
                error: ''
            };
        case UPDATE_NOTES_FAILURE:
            return {
                ...state,
                updatingNotes: false,
                error: action.payload
            };
        case DELETE_NOTES_START:
            return {
                ...state,
                deletingNotes: true,
                error: ''
            };
        case DELETE_NOTES_SUCCESS:
            console.log('DELETE_NOTES_SUCCESS: action payload:  ', action.payload)
            return {
                ...state,
                deletingNotes: false,
                animalInfo: {
                    ...state.animalInfo,
                    animal: action.payload,
                    animalMeta: action.payload.meta,
                    animalNotes: action.payload.notes,
                    animalFollowers: action.payload.followers
                },
                error: ''
            };
        case DELETE_NOTES_FAILURE:
            return {
                ...state,
                deletingNotes: false,
                error: action.payload
            };
        default:
            return state
    }
}

