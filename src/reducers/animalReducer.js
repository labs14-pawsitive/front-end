import {
    ADD_ANIMAL_START,
    ADD_ANIMAL_SUCCESS,
    ADD_ANIMAL_ERROR,
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
    UPDATE_LOCATIONS,
    UPDATE_STATES,
    EDIT_ANIMAL_INFO_START,
    EDIT_ANIMAL_INFO_SUCCESS,
    EDIT_ANIMAL_INFO_FAILURE,
    GET_DROPDOWN_START,
    GET_DROPDOWN_SUCCESS,
    GET_DROPDOWN_FAILURE,
    GET_ANIMAL_START,
    GET_ANIMAL_SUCCESS,
    GET_ANIMAL_FAILURE,
    FETCH_ANIMALS_BY_SHELTER_START,
    FETCH_ANIMALS_BY_SHELTER_SUCCESS,
    FETCH_ANIMALS_BY_SHELTER_FAILURE,
    POST_NOTES_START,
    POST_NOTES_SUCCESS,
    POST_NOTES_FAILURE,
    GET_NOTES_BY_ANIMAL_START,
    GET_NOTES_BY_ANIMAL_SUCCESS,
    GET_NOTES_BY_ANIMAL_FAILURE,
    UPDATE_NOTES_START,
    UPDATE_NOTES_SUCCESS,
    UPDATE_NOTES_FAILURE,
    DELETE_NOTES_START,
    DELETE_NOTES_SUCCESS,
    DELETE_NOTES_FAILURE,
    GET_ANIMAL_PICTURES_START,
    GET_ANIMAL_PICTURES_SUCCESS,
    GET_ANIMAL_PICTURES_FAILURE,

    


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
    updatingLocations: false,
    updatingStates: false,
    breedsOptions: [],
    sizeOptions: [],
    subscriptionOptions: [],
    coatLengthOptions: [],
    agesOptions: [],
    applicationStatusOptions: [],
    speciesOptions: [],
    animalStatusOptions: [],
    rolesOptions: [],
    locationsOptions: [],
    statesOptions: [],
    error: '',
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

    animalPictures:[],
    picturesAfterDelete:[],
    allAnimals: [],
    fetchingAllAnimals: false,               

    updatingAnimalInfo: false,
    gettingDropdownOptions: false,
    gettingAnimalInfo: false,
    addingNotes: false,
    updatingNotes: false,
    deletingNotes: false,
    gettingNotesByAnimal:false,
    gettingAnimalPictures:false
}

export const animalReducer = (state = initialState, action) => {
    switch (action.type) {
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
        case UPDATE_LOCATIONS:
            return {
                ...state,
                updatingLocations: true,
                locationsOptions: action.payload
            };
        case UPDATE_STATES:
            return {
                ...state,
                updatingStates: true,
                statesOptions: action.payload
            };
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
                    ...state.animalInfo,
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
                gettingAnimalPictures: false,
                error: action.payload
            };
            case GET_ANIMAL_PICTURES_START:
            return {
                ...state,
                gettingAnimalPictures: true,
                error: ''
            };
        case GET_ANIMAL_PICTURES_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                gettingAnimalPictures: false,
                animalPictures:action.payload,
                error: ''
            };
        case GET_ANIMAL_PICTURES_FAILURE:
            return {
                ...state,
                gettingAnimalPictures: false,
                error: action.payload
            };
            case DELETE_ANIMAL_PICTURES_START:
            return {
                ...state,
                deletingAnimalPictures: true,
                error: ''
            };
        case DELETE_ANIMAL_PICTURES_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                deletingAnimalPictures: false,
                picturesAfterDelete:action.payload,
                error: ''
            };
        case DELETE_ANIMAL_PICTURES_FAILURE:
            return {
                ...state,
                deletingAnimalPictures: false,
                error: action.payload
            };
            case FETCH_ANIMALS_BY_SHELTER_START:
            return {
                ...state,
                fetchingAllAnimals: true
            };
        case FETCH_ANIMALS_BY_SHELTER_SUCCESS:
            return {
                ...state,
                fetchingAllAnimals: false,
                allAnimals: action.payload
            };
        case FETCH_ANIMALS_BY_SHELTER_FAILURE:
            return {
                ...state,
                fetchingAllAnimals: false,
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
            case GET_NOTES_BY_ANIMAL_START:
            return {
                ...state,
                gettingNotesByAnimal: true,
                error: ''
            };
        case GET_NOTES_BY_ANIMAL_SUCCESS:
            console.log('GET_NOTES_BY_ANIMAL_SUCCESS: action payload:  ', action.payload)
            return {
                ...state,
                gettingNotesByAnimal: false,
                animalInfo: {
                    ...state.animalInfo,
                    animalNotes: action.payload.notes,                    
                },
                error: ''
            };
        case GET_NOTES_BY_ANIMAL_FAILURE:
            return {
                ...state,
                gettingNotesByAnimal: false,
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
