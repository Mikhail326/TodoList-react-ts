import { AddTodoListAC, RemoveTodoListAC, ChangeTitleTodoListAC, ChangeFilterTodoListAC } from './todolist-reducer';
import { v1 } from 'uuid';
import { TypeTodoList, TypeFilterTask } from './../App';
import { todoListReducer } from './todolist-reducer';

type EndStateType = {
  [key: string]: any
}

test('correct should add todo list', () => {
  let todoListTaskId1 = v1()
  let todoListTaskId2 = v1()

  let newTodoListTitle = 'new todo list'

  const startState = <Array<TypeTodoList>>([
    { id: todoListTaskId1, title: 'React-todolist-1', filter: 'all' },
    { id: todoListTaskId2, title: 'React-todolist-2', filter: 'active' }
  ])

  const action = AddTodoListAC(newTodoListTitle)
  const endState = <EndStateType>todoListReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(newTodoListTitle)
  expect(endState[2].filter).toBe('all')
})

test('correct remove todo list', () => {

  let todoListTaskId1 = v1()
  let todoListTaskId2 = v1()

  const startState = <Array<TypeTodoList>>([
    { id: todoListTaskId1, title: 'React-todolist-1', filter: 'all' },
    { id: todoListTaskId2, title: 'React-todolist-2', filter: 'active' }
  ])

  const action = RemoveTodoListAC(todoListTaskId1)

  const endState = <EndStateType>todoListReducer(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todoListTaskId2)
})

test('correct change title todo list', () => {

  let todoListTaskId1 = v1()
  let todoListTaskId2 = v1()

  let newTitle = 'New TITLE Todo List'

  const startState = <Array<TypeTodoList>>([
    { id: todoListTaskId1, title: 'React-todolist-1', filter: 'all' },
    { id: todoListTaskId2, title: 'React-todolist-2', filter: 'active' }
  ])

  const action = ChangeTitleTodoListAC(todoListTaskId1, newTitle)

  const endState = <EndStateType>todoListReducer(startState, action)

  expect(endState.length).toBe(2)
  expect(endState[0].title).toBe(newTitle)
  expect(endState[1].title).toBe('React-todolist-2')
})

test('correct change filter todo list', () => {

  let todoListTaskId1 = v1()
  let todoListTaskId2 = v1()

  let newFilter: TypeFilterTask = 'active'

  const startState = <Array<TypeTodoList>>([
    { id: todoListTaskId1, title: 'React-todolist-1', filter: 'all' },
    { id: todoListTaskId2, title: 'React-todolist-2', filter: 'active' }
  ])

  const action = ChangeFilterTodoListAC(todoListTaskId1, newFilter)

  const endState = <EndStateType>todoListReducer(startState, action)

  expect(endState.length).toBe(2)
  expect(endState[0].filter).toBe(newFilter)
  expect(endState[1].filter).toBe('active')
})