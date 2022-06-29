import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
}

export type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type ActionsType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
   switch (action.type) {
      case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
       case 'ADD-TODOLIST':
           return [...state, {id: v1(), title: action.title, filter: 'all'}]
       case 'CHANGE-TODOLIST-TITLE': {
           const todolist = state.find(tl => tl.id === action.id)
           if (todolist) {
               todolist.title = action.title
           }
           return [...state]
       }
       case 'CHANGE-TODOLIST-FILTER': {
           const todolist = state.find(tl => tl.id === action.id)
           if (todolist) {
               todolist.filter = action.filter
           }
           return [...state]
       }


      default:
           return state
  }
}

export  const RemoveTodolistAC = (todolistId: string): RemoveTodolistAT => {
    return { type: "REMOVE-TODOLIST", id: todolistId }
}

export  const AddTodolistAC = (title: string): AddTodolistAT => {
    return { type: "ADD-TODOLIST", title: title }
}

export  const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => {
    return { type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}

export  const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterAT => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}