import {SET_ERRORS, CLEAR_ERRORS, LOADING_UI} from '../types'

const initErrors = {
  email: '',
  password: '',
  general: ''
}

const initState = {
  loading: false,
  errors: initErrors
}

const uiReducer =  (state = initState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: initErrors
      }
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}

export default uiReducer