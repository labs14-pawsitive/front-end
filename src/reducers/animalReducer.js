import {
    EDIT_ANIMAL_INFO_START,
    EDIT_ANIMAL_INFO_SUCCESS,
    EDIT_ANIMAL_INFO_FAILURE,
    GET_DROPDOWN_START,
    GET_DROPDOWN_SUCCESS,
    GET_DROPDOWN_FAILURE
} from '../actions/animalAction.js'

const initialState = {
    animalID : null,
    animalInfo:null,
    dropdownAnimalInfo:{
        size:[],
        breeds:[],
        coat_length:[],
        subscriptions:[],
        ages:[],
        application_status:[],
        species:[],
        animal_status:[],
        roles:[]
    },
    updatingAnimalInfo:false,
    gettingAllAnimalInfo:false
}

export const animalReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_DROPDOWN_START:
            return {
                ...state,
                gettingAllAnimalInfo: true,
                error: ''
            };
        case GET_DROPDOWN_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                gettingAllAnimalInfo: false,
                dropdownAnimalInfo:{
                    size:action.payload.size,
                    breeds:action.payload.breeds,
                    coat_length:action.payload.coat_length,
                    subscriptions:action.payload.subscriptions,
                    ages:action.payload.ages,
                    application_status:action.payload.application_status,
                    species:action.payload.species,
                    animal_status:action.payload.animal_status,
                    roles:action.payload.roles,
                },
                error: ''
            };
        case GET_DROPDOWN_FAILURE:
            return {
                ...state,
                gettingAllAnimalInfo: false,
                error: action.payload
            };
        case EDIT_ANIMAL_INFO_START:
            return {
                ...state,
                updatingAnimalInfo: true,
                error: ''
            };
        case EDIT_ANIMAL_INFO_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                updatingAnimalInfo: false,
                animalInfo: action.payload,
                error: ''
            };
        case EDIT_ANIMAL_INFO_FAILURE:
            return {
                ...state,
                updatingAnimalInfo: false,
                error: action.payload
            };
            default:
      return state
    }
}

