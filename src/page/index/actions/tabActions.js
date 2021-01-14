import {ADD_TODO} from './actionTypes'

export const addTodo = (obj)=>{
  return{
    type:ADD_TODO,
    obj
  }
}