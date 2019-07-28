import axios from 'axios'

export const EDIT_ANIMAL_INFO_START = 'EDIT_ANIMAL_INFO_START'
export const EDIT_ANIMAL_INFO_SUCCESS = 'EDIT_ANIMAL_INFO_SUCCESS'
export const EDIT_ANIMAL_INFO_FAILURE = 'EDIT_ANIMAL_INFO_FAILURE'

export const updateAnimal = (updateinfo,animalId,animalMetaId) => dispatch => {
  console.log('action updateInfo data ', updateinfo)
 
  dispatch({ type: EDIT_ANIMAL_INFO_START })
  return axios
    .put(`http://localhost:8000/api/animals/${animalId}/meta/${animalMetaId}`, updateinfo)
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
        console.log('get all animal options info', res.data)
      })
      .catch(err => {
        dispatch({ type: GET_DROPDOWN_FAILURE, payload: err.response })
        console.log('get animal info error: ', err.response)
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
          console.log('get all animal info', res.data)
        })
        .catch(err => {
          dispatch({ type: GET_ANIMAL_FAILURE, payload: err.response })
          console.log('get animal info error: ', err.response)
        })
    }  