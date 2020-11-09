/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
} from '../types'

const initState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
}

const userReducer = (state = initState, action) => {
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

export default userReducer
