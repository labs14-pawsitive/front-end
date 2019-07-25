import axios from 'axios'

export const EDIT_ANIMAL_INFO_START = 'EDIT_ANIMAL_INFO_START'
export const EDIT_ANIMAL_INFO_SUCCESS = 'EDIT_ANIMAL_INFO_SUCCESS'
export const EDIT_ANIMAL_INFO_FAILURE = 'EDIT_ANIMAL_INFO_FAILURE'

export const updateAnimal = (animalItem, animalMetaItem) => dispatch => {
  console.log('action updateQuestion data ', updatedItem)
  let updatedItem = {animalItem,animalMetaItem}
  dispatch({ type: EDIT_ANIMAL_INFO_START })
  return axios
    .put(`http://localhost:8000/api/animals/${animalItem.id}/meta/${animalMetaItem}`, updatedItem)
    .then(res => {
      dispatch({ type: EDIT_ANIMAL_INFO_SUCCESS, payload: res.data })
      console.log('update animal ', res.data)
    })
    .catch(err => {
      dispatch({ type: EDIT_ANIMAL_INFO_FAILURE, payload: err.response })
      console.log('update animal error: ', err.response)
    })
}


export const GET_DROPDOWN_START = 'GET_DROPDOWN_START'
export const GET_DROPDOWN_SUCCESS = 'GET_DROPDOWN_SUCCESS'
export const GET_DROPDOWN_FAILURE = 'GET_DROPDOWN_FAILURE'

export const getAllAnimalInfo = () => dispatch => {
    
    dispatch({ type: GET_DROPDOWN_START })
    return axios
      .get('http://localhost:8000/api/internal/paws/options')
      .then(res => {
        dispatch({ type: GET_DROPDOWN_SUCCESS, payload: res.data })
        console.log('get all animal info', res.data)
      })
      .catch(err => {
        dispatch({ type: GET_DROPDOWN_FAILURE, payload: err.response })
        console.log('get animal info error: ', err.response)
      })
  }