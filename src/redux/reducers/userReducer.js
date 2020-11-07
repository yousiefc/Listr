/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
} from '../types'

const initState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      }
    case SET_UNAUTHENTICATED:
      return initState
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload,
      }
    default:
      return state
  }
}
