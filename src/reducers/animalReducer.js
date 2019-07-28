import {
    EDIT_ANIMAL_INFO_START,
    EDIT_ANIMAL_INFO_SUCCESS,
    EDIT_ANIMAL_INFO_FAILURE,
    GET_DROPDOWN_START,
    GET_DROPDOWN_SUCCESS,
    GET_DROPDOWN_FAILURE,
    GET_ANIMAL_START,
    GET_ANIMAL_SUCCESS,
    GET_ANIMAL_FAILURE
} from '../actions/animalAction.js'
import { CardActions } from '@material-ui/core';

const initialState = {
    animalID : null,
    animalInfo:null,
    dropdownAnimalOptions:{
        size:[],
        breeds:[],
        coat_length:[],
        subscriptions:[],
        ages:[],
        application_status:[],
        species:[],
        animal_status:[],
        roles:[],
        states:[],
        locations:[],
        contacts:[],
    },
    animalInfo:{
        animal:[],
        animalMeta:[],
        animalNotes:[],
        animalFollowers:[]
    },
    updatingAnimalInfo:false,
    gettingDropdownOptions:false,
    gettingAnimalInfo:false
}

export const animalReducer = (state = initialState, action) => {
    switch(action.type) {
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
                dropdownAnimalOptions:{
                    size:action.payload.size,
                    breeds:action.payload.breeds,
                    coat_length:action.payload.coat_length,
                    subscriptions:action.payload.subscriptions,
                    ages:action.payload.ages,
                    application_status:action.payload.application_status,
                    species:action.payload.species,
                    animal_status:action.payload.animal_status,
                    roles:action.payload.roles,
                    states:action.payload.states,
                    locations:action.payload.locations,
                    contacts:action.payload.contacts
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
                    animalInfo:{
                        animal:action.payload,
                        animalMeta:action.payload.meta,
                        animalNotes:action.payload.notes,
                        animalFollowers:action.payload.followers
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

