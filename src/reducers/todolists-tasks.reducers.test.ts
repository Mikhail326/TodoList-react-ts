import { tasksReducer } from './tasks-reducer';
import { TypeTodoList, TypeArrayTasks } from './../App';
import { addTodoListAC, todoListReducer, removeTodoListAC } from './todolist-reducer';

test('correct add todo list in two reducers', () => {
  const startStateTodoList: Array<TypeTodoList> = []
  const startStateTasks: TypeArrayTasks = {}


  const action = addTodoListAC('111')

  const endSateTodoList = todoListReducer(startStateTodoList, action)
  const endSateTasks = tasksReducer(startStateTasks, action)


  if(endSateTodoList) {
    expect(endSateTodoList[0].id).toBe(action.id)
  }


  const keys = Object.keys(endSateTasks)
  if(endSateTasks) {
    expect(keys[0]).toBe(action.id)
  }
})
