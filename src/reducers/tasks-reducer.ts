import { ActionAdd, ActionRemove } from './todolist-reducer';
import { TypeArrayTasks } from './../App';
import { v1 } from 'uuid';

type AddTaskType = {
  type: 'ADD-TASK'
  title: string
  idTodoList: string
}

type RemoveTaskType = {
  type: 'REMOVE-TASK'
  idTodoList: string
  idTask: string
}

type ChangeStatusTaskType = {
  type: 'CHANGE-STATUS-TASK'
  idTodoList: string
  idTask: string
  isDone: boolean
}

type ChangeTitleTaskType = {
  type: 'CHANGE-TITLE-TASK'
  idTodoList: string
  idTask: string
  newTitle: string
}

type ActionType = AddTaskType | RemoveTaskType | ChangeStatusTaskType | ChangeTitleTaskType | ActionAdd | ActionRemove

export const tasksReducer = (state: TypeArrayTasks, action: ActionType) => {
  switch (action.type) {
    case 'ADD-TASK': {
      const newTask = {
        id: v1(),
        title: action.title,
        isDone: false
      }
      const todoList = state[action.idTodoList]
      const newArrTasks = [newTask, ...todoList]
      state[action.idTodoList] = newArrTasks
      return { ...state }
    }
    case 'REMOVE-TASK': {
      const todoList = state[action.idTodoList]
      const filterTasks = todoList.filter(task => task.id !== action.idTask)
      state[action.idTodoList] = filterTasks
      return { ...state }
    }
    case 'CHANGE-STATUS-TASK': {
      const todoList = state[action.idTodoList]
      const task = todoList.find(t => t.id === action.idTask)
      if (task) {
        task.isDone = action.isDone
      }
      return { ...state }
    }
    case 'CHANGE-TITLE-TASK': {
      const todoList = state[action.idTodoList]
      const task = todoList.find(t => t.id === action.idTask)
      if (task) {
        task.title = action.newTitle
      }
      return { ...state }
    }
    case 'ADD-TODO-LIST': {
      const copyState = { ...state }
      copyState[action.id] = []
      return copyState
    }
    case 'REMOVE-TODO-LIST': {
      const copyState = { ...state }
      delete copyState[action.id]
      return copyState
    }
    default: console.log('error task')
  }
}

export const addTaskAC = (title: string, idTodoList: string): AddTaskType => {
  return { type: 'ADD-TASK', title, idTodoList }
}

export const removeTaskAC = (idTodoList: string, idTask: string): RemoveTaskType => {
  return { type: 'REMOVE-TASK', idTodoList, idTask }
}

export const changeStatusTaskAC = (idTodoList: string, idTask: string, isDone: boolean): ChangeStatusTaskType => {
  return { type: 'CHANGE-STATUS-TASK', idTodoList, idTask, isDone }
}

export const changeTitleTaskAC = (idTodoList: string, idTask: string, newTitle: string): ChangeTitleTaskType => {
  return { type: 'CHANGE-TITLE-TASK', idTodoList, idTask, newTitle }
}

