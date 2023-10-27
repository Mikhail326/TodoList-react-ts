import { v1 } from 'uuid';
import { TypeTodoList, TypeFilterTask } from './../App';

type ActionAdd = {
  type: 'ADD-TODO-LIST',
  title: string
}

type ActionRemove = {
  type: 'REMOVE-TODO-LIST',
  id: string
}

type ActionChangeTitleTodoList = {
  type: 'CHANGE-TITLE-TODO-LIST',
  id: string,
  title: string
}
type ActionChangeFilterTodoList = {
  type: 'CHANGE-FILTER-TODO-LIST',
  id: string,
  filter: TypeFilterTask
}

type ActionsTypes = ActionAdd | ActionRemove | ActionChangeTitleTodoList | ActionChangeFilterTodoList

export const todoListReducer = (state: Array<TypeTodoList>, action: ActionsTypes) => {
  switch (action.type) {
    case 'ADD-TODO-LIST': return [...state, {
      id: v1(),
      title: action.title,
      filter: 'all'
    }]
    case 'REMOVE-TODO-LIST': {
      return state.filter(t => t.id !== action.id)
    }
    case 'CHANGE-TITLE-TODO-LIST': {
      const todoList = state.find(t => t.id === action.id)
      if (todoList) {
        todoList.title = action.title
      }
      return [...state]
    }
    case 'CHANGE-FILTER-TODO-LIST': {
      const todoList = state.find(t => t.id === action.id)
      if (todoList) {
        todoList.filter = action.filter
      }
      return [...state]
    }
    default: console.log('error')
  }
}

export const AddTodoListAC = (newTodoListTitle: string): ActionAdd => {
  return { type: 'ADD-TODO-LIST', title: newTodoListTitle }
}

export const RemoveTodoListAC = (id: string): ActionRemove => {
  return { type: 'REMOVE-TODO-LIST', id }
}

export const ChangeTitleTodoListAC = (id: string, title: string): ActionChangeTitleTodoList => {
  return { type: 'CHANGE-TITLE-TODO-LIST', id, title }
}

export const ChangeFilterTodoListAC = (id: string, filter: TypeFilterTask): ActionChangeFilterTodoList => {
  return { type: 'CHANGE-FILTER-TODO-LIST', id, filter }
}