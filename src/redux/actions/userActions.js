/* eslint-disable no-restricted-globals */
import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER
} from '../types'
import history from '../../utils/history'
import axios from 'axios'

export const LoginUser = (userData, dispatch) => {
  dispatch({ type: LOADING_UI })

  axios
    .post(
      'https://us-central1-listr-fcbc3.cloudfunctions.net/api/login',
      userData
    )
    .then(res => {
      setAuthorizationHeader(res.data.token)
      dispatch(GetUserData(dispatch))
      dispatch({ type: CLEAR_ERRORS })
      history.push('/')
    })
    .catch(err => {
      if (err.response) {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        })
      } else {
        dispatch({
          type: CLEAR_ERRORS})
      }
    })
}

export const SignupUser = (newUserData, dispatch) => {
  dispatch({ type: LOADING_UI })

  axios
    .post(
      'https://us-central1-listr-fcbc3.cloudfunctions.net/api/signup',
      newUserData
    )
    .then(res => {
      setAuthorizationHeader(res.data.token)
      dispatch(GetUserData(dispatch))
      dispatch({ type: CLEAR_ERRORS })
      history.push('/')
    })
    .catch(err => {
      if (err.response) {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        })
      } else {
        dispatch({
          type: CLEAR_ERRORS})
      }
    })
}

//wherever this gets called from i need to define dispatch = useDispatch() and pass it in here
export const LogoutUser = dispatch => {
  localStorage.removeItem('idToken')
  delete axios.defaults.headers.common['Authorization']
  dispatch({ type: SET_UNAUTHENTICATED })
}

export const uploadImage = (formData, dispatch) => {
  dispatch({type: LOADING_USER})
  axios.post('https://us-central1-listr-fcbc3.cloudfunctions.net/api/user/image', formData)
    .then(res => {
      dispatch(GetUserData(dispatch))
    })
    .catch(e => console.error(e))
}

export const GetUserData = dispatch => {
  dispatch({type: LOADING_USER})
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

export const editUserDetails = (userDetails, dispatch) => {
  dispatch({type: LOADING_USER})
  axios.post('https://us-central1-listr-fcbc3.cloudfunctions.net/api/user', userDetails)
    .then(() => {
      dispatch(GetUserData(dispatch))
    })
    .catch(e => console.error(e))
}

const setAuthorizationHeader = token => {
  const authToken = `Bearer ${token}`
  localStorage.setItem('idToken', authToken)
  axios.defaults.headers.common['Authorization'] = authToken
}
