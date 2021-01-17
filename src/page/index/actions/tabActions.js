import {
  ADD_TODO
} from './actionTypes'
import {
  CHANGE_TAB
} from './actionTypes'

export const addTodo = (obj) => {
  return {
    type: ADD_TODO,
    obj
  }
}

export const changeTab = (obj) => {
  return {
    type: CHANGE_TAB,
    obj
  }
}