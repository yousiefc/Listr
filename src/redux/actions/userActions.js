import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types'
//import history from '../utils/history'
import axios from 'axios'

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI })

  axios
    .post(
      'https://us-central1-listr-fcbc3.cloudfunctions.net/api/login',
      userData
    )
    .then(res => {
      const token = `Bearer ${res.data.token}`
      console.log(res.data)
      localStorage.setItem('idToken', token)
      axios.defaults.headers.common['Authorization'] = token
      dispatch(getUserData())
      dispatch({ type: CLEAR_ERRORS })
      history.push('/')
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      })
    })
}

export const getUserData = () => dispatch => {
  axios
    .get('https://us-central1-listr-fcbc3.cloudfunctions.net/api/user')
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      })
    })
    .catch(e => console.log(e))
}
