import { addTodoListAC, removeTodoListAC } from './todolist-reducer';
import { TypeArrayTasks } from './../App';
import { tasksReducer, addTaskAC, removeTaskAC, changeStatusTaskAC, changeTitleTaskAC } from './tasks-reducer';
import { v1 } from 'uuid';

test('correct add task', () => {
  const todoListTaskId1 = v1()
  const todoListTaskId2 = v1()

  const titleTask = 'new task'

  const startState = <TypeArrayTasks>{
    [todoListTaskId1]: [
      { id: v1(), title: 'js', isDone: true },
      { id: v1(), title: 'CSS', isDone: false },
      { id: v1(), title: 'HTML', isDone: false }
    ],
    [todoListTaskId2]: [
      { id: v1(), title: 'redux', isDone: false },
      { id: v1(), title: 'mobx', isDone: true },
      { id: v1(), title: 'react', isDone: true }
    ]
  }

  const action = addTaskAC(titleTask, todoListTaskId1)

  const endState = tasksReducer(startState, action)

  if (endState) {
    expect(endState[todoListTaskId1].length).toBe(4)
    expect(endState[todoListTaskId1][0].title).toBe(titleTask)
  }
})

test('correct remove task', () => {
  const todoListTaskId1 = v1()
  const todoListTaskId2 = v1()

  const idTaskRemove = v1()

  const startState = <TypeArrayTasks>{
    [todoListTaskId1]: [
      { id: v1(), title: 'js', isDone: true },
      { id: idTaskRemove, title: 'CSS', isDone: false },
      { id: v1(), title: 'HTML', isDone: false }
    ],
    [todoListTaskId2]: [
      { id: v1(), title: 'redux', isDone: false },
      { id: v1(), title: 'mobx', isDone: true },
      { id: v1(), title: 'react', isDone: true }
    ]
  }

  const action = removeTaskAC(todoListTaskId1, idTaskRemove)

  const endState = tasksReducer(startState, action)

  if (endState) {
    expect(endState[todoListTaskId1].length).toBe(2)
    expect(endState[todoListTaskId1][1].title).toBe('HTML')
  }
})

test('correct change task status', () => {
  const todoListTaskId1 = v1()
  const todoListTaskId2 = v1()

  const idTask = v1()
  const taskIsDone = true

  const startState = <TypeArrayTasks>{
    [todoListTaskId1]: [
      { id: v1(), title: 'js', isDone: true },
      { id: v1(), title: 'CSS', isDone: false },
      { id: v1(), title: 'HTML', isDone: false }
    ],
    [todoListTaskId2]: [
      { id: idTask, title: 'redux', isDone: false },
      { id: v1(), title: 'mobx', isDone: true },
      { id: v1(), title: 'react', isDone: true }
    ]
  }

  const action = changeStatusTaskAC(todoListTaskId2, idTask, taskIsDone)

  const endState = tasksReducer(startState, action)

  if (endState) {
    expect(endState[todoListTaskId2][0].isDone).toBe(true)
  }
})

test('correct change title task', () => {
  const todoListTaskId1 = v1()
  const todoListTaskId2 = v1()

  const idTask = v1()
  const newTitleTask = 'new title task'

  const startState = <TypeArrayTasks>{
    [todoListTaskId1]: [
      { id: v1(), title: 'js', isDone: true },
      { id: idTask, title: 'CSS', isDone: false },
      { id: v1(), title: 'HTML', isDone: false }
    ],
    [todoListTaskId2]: [
      { id: v1(), title: 'redux', isDone: false },
      { id: v1(), title: 'mobx', isDone: true },
      { id: v1(), title: 'react', isDone: true }
    ]
  }

  const action = changeTitleTaskAC(todoListTaskId1, idTask, newTitleTask)

  const endState = tasksReducer(startState, action)

  if (endState) {
    expect(endState[todoListTaskId1].length).toBe(3)
    expect(endState[todoListTaskId2].length).toBe(3)
    expect(endState[todoListTaskId1][1].title).toBe(newTitleTask)
  }
})

test('correct add todo list', () => {
  const todoListTaskId1 = v1()
  const todoListTaskId2 = v1()

  const startState = <TypeArrayTasks>{
    [todoListTaskId1]: [
      { id: v1(), title: 'js', isDone: true },
      { id: v1(), title: 'CSS', isDone: false },
      { id: v1(), title: 'HTML', isDone: false }
    ],
    [todoListTaskId2]: [
      { id: v1(), title: 'redux', isDone: false },
      { id: v1(), title: 'mobx', isDone: true },
      { id: v1(), title: 'react', isDone: true }
    ]
  }

  const action = addTodoListAC(todoListTaskId1)

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState)

  if (endState) {
    expect(keys[2]).toBe(action.id)
  }
})

test('correct remove todo list', () => {
  const todoListTaskId1 = v1()
  const todoListTaskId2 = v1()

  const startState = <TypeArrayTasks>{
    [todoListTaskId1]: [
      { id: v1(), title: 'js', isDone: true },
      { id: v1(), title: 'CSS', isDone: false },
      { id: v1(), title: 'HTML', isDone: false }
    ],
    [todoListTaskId2]: [
      { id: v1(), title: 'redux', isDone: false },
      { id: v1(), title: 'mobx', isDone: true },
      { id: v1(), title: 'react', isDone: true }
    ]
  }

  const action = removeTodoListAC(todoListTaskId1)

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState)

  if (endState) {
    expect(keys.length).toBe(1)
    expect(keys[0]).toBe(todoListTaskId2)
    expect(endState[todoListTaskId1]).toBeUndefined()
  }
})