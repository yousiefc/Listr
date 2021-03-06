import { SET_LISTS, LOADING_DATA, LIKE_LIST, UNLIKE_LIST, DELETE_LIST } from '../types'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_API

/* GET ALL LISTS */
export const getLists = dispatch => {
  dispatch({ type: LOADING_DATA })
  axios
    .get(`${baseUrl}/lists`)
    .then(res => {
      dispatch({ type: SET_LISTS, payload: res.data })
    })
    .catch(e => {
      dispatch({ type: SET_LISTS, payload: [] })
    })
}

/* LIKE A LIST */
export const likeList = (listId, dispatch) => {
  axios
    .get(
      `${baseUrl}/list/${listId}/like`
    )
    .then(res => {
      dispatch({ type: LIKE_LIST, payload: res.data })
      console.log('DONE LIKE')
    })
    .catch(e => console.error(e))
}

/* UNLIKE A LIST */
export const unlikeList = (listId, dispatch) => {
  axios
    .get(
      `${baseUrl}/list/${listId}/unlike`
    )
    .then(res => {
      dispatch({ type: UNLIKE_LIST, payload: res.data.listData })
      console.log('DONE UNLIKE')
    })
    .catch(e => console.error(e))
}

/* DELETE A LIST */
export const deleteList = (listId, dispatch) => {
  axios
    .delete(
      `${baseUrl}/list/${listId}`
    )
    .then(() => {
      dispatch({ type: DELETE_LIST, payload: listId })
    })
    .catch(e => console.error(e))
}
