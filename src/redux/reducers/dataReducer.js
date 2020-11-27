import { SET_LISTS, LIKE_LIST, UNLIKE_LIST, LOADING_DATA, DELETE_LIST } from '../types'

const initState = {
  lists: [],
  list: {},
  loading: false,
}

const dataReducer = (state = initState, action) => {
  let index
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      }
    case SET_LISTS:
      return {
        ...state,
        lists: action.payload,
        loading: false,
      }
    case UNLIKE_LIST:
    case LIKE_LIST:
      index = state.lists.findIndex(
        list => list.listId === action.payload.listId
      )

      state.lists[index].likeCount = action.payload.likeCount
      return {
        ...state
      }
    case DELETE_LIST:
      index = state.lists.findIndex(list => list.listId === action.payload)
      state.screams.splice(index, 1)
      return {
        ...state
      }
    default:
      return state
  }
}

export default dataReducer
