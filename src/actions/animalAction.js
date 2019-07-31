 
import axios from 'axios';

export const ADD_ANIMAL_START = 'ADD_ANIMAL_START';
export const ADD_ANIMAL_SUCCESS = 'ADD_ANIMAL_SUCCESS';
export const ADD_ANIMAL_ERROR = 'ADD_ANIMAL_ERROR'

export const addAnimal  = animal => dispatch => {
    dispatch ({type: ADD_ANIMAL_START});
    console.log(animal)
    return axios
        .post('http://localhost:8000/api/animals', animal)
        .then(res => {
            dispatch ({type: ADD_ANIMAL_SUCCESS, payload: res.data})
            return res.data
        })
        .catch(err => {
            dispatch({type: ADD_ANIMAL_ERROR, payload: err.response})
        })
}

export const FETCH_OPTIONS_START = 'FETCH_OPTIONS_START';
export const FETCH_OPTIONS_SUCCESS = 'FETCH_OPTIONS_SUCCESS';
export const FETCH_OPTIONS_ERROR = 'FETCH_OPTIONS_ERROR';
export const UPDATE_BREEDS = 'UPDATE_BREEDS';
export const UPDATE_SIZE = 'UPDATE_SIZE';
export const UPDATE_SUBSCRIPTIONS = 'UPDATE_SUBSCRIPTIONS';
export const UPDATE_COAT_LENGTH = 'UPDATE_COAT_LENGTH';
export const UPDATE_AGES = 'UPDATE_AGES';
export const UPDATE_APPLICATION_STATUS = 'UPDATE_APPLICATION_STATUS';
export const UPDATE_SPECIES = 'UPDATE_SPECIES';
export const UPDATE_ANIMAL_STATUS = 'UPDATE_ANIMAL_STATUS';
export const UPDATE_ROLES = 'UPDATE_ROLES';
export const UPDATE_LOCATIONS = 'UPDATE_LOCATIONS';
export const UPDATE_STATES = 'UPDATE_STATES'


export const fetchOptions  = (shelterId) => dispatch => {
    dispatch ({type: FETCH_OPTIONS_START});
    // const headers = {Authorization: localStorage.getItem('token')}
    return axios
    .get(`http://localhost:8000/api/internal/paws/options/${shelterId}`)
    .then(res => {
        console.log(res)
        dispatch ({type: UPDATE_BREEDS, payload: res.data.breeds})
        dispatch ({type: UPDATE_SIZE, payload: res.data.size})
        dispatch ({type: UPDATE_SUBSCRIPTIONS, payload: res.data.subscriptions})
        dispatch ({type: UPDATE_COAT_LENGTH, payload: res.data.coat_length})
        dispatch ({type: UPDATE_AGES, payload: res.data.ages})
        dispatch ({type: UPDATE_APPLICATION_STATUS, payload: res.data.application_status})
        dispatch ({type: UPDATE_SPECIES, payload: res.data.species})
        dispatch ({type: UPDATE_ANIMAL_STATUS, payload: res.data.animal_status})
        dispatch ({type: UPDATE_ROLES, payload: res.data.roles})
        dispatch ({type: UPDATE_LOCATIONS, payload: res.data.locations})
        dispatch ({type: UPDATE_STATES, payload: res.data.states})
        dispatch ({type: FETCH_OPTIONS_SUCCESS, payload: res.data})
    })
    .catch(err => {
        dispatch({type: FETCH_OPTIONS_ERROR, payload: err.response})
    })
} 

 

export const EDIT_ANIMAL_INFO_START = 'EDIT_ANIMAL_INFO_START'
export const EDIT_ANIMAL_INFO_SUCCESS = 'EDIT_ANIMAL_INFO_SUCCESS'
export const EDIT_ANIMAL_INFO_FAILURE = 'EDIT_ANIMAL_INFO_FAILURE'

export const updateAnimal = (updateinfo,animalId,animalMetaId) => dispatch => {
  console.log('action updateInfo data ', updateinfo)
 
  dispatch({ type: EDIT_ANIMAL_INFO_START })
  return axios
    .put(`http://localhost:8000/api/animals/${animalId}/meta/${animalMetaId}`, updateinfo)
    .then(res => axios
      .get(`http://localhost:8000/api/animals/${animalId}`))
    .then(res => {
      dispatch({ type: EDIT_ANIMAL_INFO_SUCCESS, payload: res.data })
      console.log('action updated animal ', res.data)
    })
    .catch(err => {
      dispatch({ type: EDIT_ANIMAL_INFO_FAILURE, payload: err.response })
      console.log('action update animal error: ', err.response)
    })
}


export const GET_DROPDOWN_START = 'GET_DROPDOWN_START'
export const GET_DROPDOWN_SUCCESS = 'GET_DROPDOWN_SUCCESS'
export const GET_DROPDOWN_FAILURE = 'GET_DROPDOWN_FAILURE'

export const getAllOptions = (shelterID) => dispatch => {
    
    dispatch({ type: GET_DROPDOWN_START })
    return axios
      .get(`http://localhost:8000/api/internal/paws/options/${shelterID}`)
      
      .then(res => {
        dispatch({ type: GET_DROPDOWN_SUCCESS, payload: res.data })
        console.log('action: get all animal options info', res.data)
      })
      .catch(err => {
        dispatch({ type: GET_DROPDOWN_FAILURE, payload: err.response })
        console.log('action: get animal info error: ', err.response)
      })
  }

  export const GET_ANIMAL_START = 'GET_ANIMAL_START'
  export const GET_ANIMAL_SUCCESS = 'GET_ANIMAL_SUCCESS'
  export const GET_ANIMAL_FAILURE = 'GET_ANIMAL_FAILURE'
  
  export const getInfoByAnimalID = (animalID) => dispatch => {
      
      dispatch({ type: GET_ANIMAL_START })
      return axios
        .get(`http://localhost:8000/api/animals/${animalID}`)
        .then(res => {
          dispatch({ type: GET_ANIMAL_SUCCESS, payload: res.data })
          console.log('action: get all animal info', res.data)
        })
        .catch(err => {
          dispatch({ type: GET_ANIMAL_FAILURE, payload: err.response })
          console.log('action: get animal info error: ', err.response)
        })
    }  

    export const POST_NOTES_START = 'POST_NOTES_START'
    export const POST_NOTES_SUCCESS = 'POST_NOTES_SUCCESS'
    export const POST_NOTES_FAILURE = 'POST_NOTES_FAILURE'

    export const GET_NOTES_BY_ANIMAL_START = 'GET_NOTES_BY_ANIMAL_START'
    export const GET_NOTES_BY_ANIMAL_SUCCESS = 'GET_NOTES_BY_ANIMAL_SUCCESS'
    export const GET_NOTES_BY_ANIMAL_FAILURE = 'GET_NOTES_BY_ANIMAL_FAILURE'

    export const addNotes = (animalID, note) => dispatch => {
        
        dispatch({ type: POST_NOTES_START })
        return axios
          .post(`http://localhost:8000/api/animals/${animalID}/admin`, note)
          .then(res => axios
            .get(`http://localhost:8000/api/animals/${animalID}`))
          .then(res => {
            dispatch({ type: GET_ANIMAL_SUCCESS, payload: res.data })
            console.log('action: update notes info', res.data)
          })
          // .then(res => axios
          //   .get(`http://localhost:8000/api/animals/${animalID}/admin`))
          // .then(res => {
          //   dispatch({ type: GET_NOTES_BY_ANIMAL_SUCCESS, payload: res.data })
          //   console.log('action :get notes info', res.data)
          // })
          .catch(err => {
            dispatch({ type: POST_NOTES_FAILURE, payload: err.response })
            console.log('action: get notes info error: ', err.response)
          })
      }

      export const UPDATE_NOTES_START = 'UPDATE_NOTES_START'
      export const UPDATE_NOTES_SUCCESS = 'UPDATE_NOTES_SUCCESS'
      export const UPDATE_NOTES_FAILURE = 'UPDATE_NOTES_FAILURE'
      
      export const updateNotes = (animalID,noteID,updateNote) => dispatch => {
          
          dispatch({ type: UPDATE_NOTES_START })
          return axios
            .put(`http://localhost:8000/api/animals/${animalID}/admin/${noteID}`,updateNote)
            .then(res => axios
              .get(`http://localhost:8000/api/animals/${animalID}`))
            .then(res => {
              dispatch({ type: UPDATE_NOTES_SUCCESS, payload: res.data })
              console.log('action: update notes info', res.data)
            })
            .catch(err => {
              dispatch({ type: UPDATE_NOTES_FAILURE, payload: err.response })
              console.log('action: update notes error: ', err.response)
            })
        }


        export const DELETE_NOTES_START = 'DELETE_NOTES_START'
        export const DELETE_NOTES_SUCCESS = 'DELETE_NOTES_SUCCESS'
        export const DELETE_NOTES_FAILURE = 'DELETE_NOTES_FAILURE'
        
        export const deleteNotes = (animalID,noteID) => dispatch => {
            
            dispatch({ type: DELETE_NOTES_START })
            return axios
              .delete(`http://localhost:8000/api/animals/${animalID}/admin/${noteID}`)
              .then(res => axios
                .get(`http://localhost:8000/api/animals/${animalID}`))
              .then(res => {
                dispatch({ type: DELETE_NOTES_SUCCESS, payload: res.data })
                console.log('action: delete notes info', res.data)
              })
              .catch(err => {
                dispatch({ type: DELETE_NOTES_FAILURE, payload: err.response })
                console.log('action: delete notes error: ', err.response)
              })
          }

