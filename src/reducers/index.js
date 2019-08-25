//pawsnfind will be using combine reducers for featured based reducers
import { combineReducers } from "redux";
import { userReducer } from './userReducer.js';
import { shelterReducer } from './shelterReducer.js';
import { applicationReducer } from './applicationReducer.js';
import { searchReducer } from './searchReducer.js';
import { animalReducer } from './animalReducer.js'
import { mainPageReducer } from './mainPageReducer.js'
 


export default combineReducers({
    userReducer,
    shelterReducer,
    applicationReducer,
    animalReducer,
    searchReducer,
    mainPageReducer
});