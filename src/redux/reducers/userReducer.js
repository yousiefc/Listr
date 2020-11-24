/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_LIST,
  UNLIKE_LIST
} from '../types'

const initState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
  loading: false
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
        loading: false,
        ...action.payload,
      }
    case LOADING_USER:
      return {
        ...state,
        loading: true
      }
    case LIKE_LIST:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            listId: action.payload.listId
          }
        ]
      }
    case UNLIKE_LIST:
      return {
        ...state,
        likes: state.likes.filter(like => like.listId !== action.payload.listId)
      }
    default:
      return state
  }
}

export default userReducer
