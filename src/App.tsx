import React, { useState } from 'react';
import './App.css';
import TodoList, { TasksType } from './components/TodoList/TodoList';
import { v1 } from 'uuid';
import InputAddItemForm from './components/InputAddItemForm/InputAddItemForm';

export type TypeFilterTask = 'all' | 'completed' | 'active'
export type TypeTodoList = { id: string, title: string, filter: TypeFilterTask }
export type TypeArrayTasks = {
  [key:string]: Array<TasksType>
}

function App() {

  const changeTaskStatus = (id: string, status: boolean, idTodoList: string) => {
    let newTasks = tasks[idTodoList]
    const task = newTasks.find(el => el.id === id)
    if (task) {
      task.isDone = status
      setTasks({ ...tasks })
    }
  }

  const removeTask = (id: string, idTodoList: string) => {
    let newTasks = tasks[idTodoList]
    let filteredTasks = newTasks.filter(el => el.id !== id)
    tasks[idTodoList] = filteredTasks
    setTasks({ ...tasks })
  }

  const addTask = (title: string, idTodoList: string) => {
    let newTask = { id: v1(), title: title, isDone: false }
    let newTasks = tasks[idTodoList]
    let newArrTasks = [newTask, ...newTasks]
    tasks[idTodoList] = newArrTasks
    setTasks({ ...tasks })
  }

  const removeTodoList = (idTodoList: string) => {
    const filterTodoList = todoLists.filter(el => el.id !== idTodoList)
    setTodoLists(filterTodoList)
    delete tasks[idTodoList]
    setTasks({ ...tasks })
  }

  const todoListTaskId1 = v1()
  const todoListTaskId2 = v1()

  const [todoLists, setTodoLists] = useState<Array<TypeTodoList>>([
    { id: todoListTaskId1, title: 'React-todolist-1', filter: 'all' },
    { id: todoListTaskId2, title: 'React-todolist-2', filter: 'active' }
  ])

  const [tasks, setTasks] = useState<TypeArrayTasks>({
    [todoListTaskId1]: [
      { id: v1(), title: 'js', isDone: true },
      { id: v1(), title: 'CSS', isDone: false },
      { id: v1(), title: 'HTML', isDone: false }
    ],
    [todoListTaskId2]: [
      { id: v1(), title: 'redux', isDone: false },
      { id: v1(), title: 'mobx', isDone: true },
      { id: v1(), title: 'react', isDone: true }
    ],
  })

  const addTodoList = (title: string) => {
    const newTodoList: TypeTodoList = { id: v1(), title: title, filter: 'all' }
    setTodoLists([newTodoList, ...todoLists])
    setTasks({ ...tasks, [newTodoList.id]: [] })
  }

  const changeTitleTask = (id: string, newTitleTask: string, idTodoList: string) => {
    let newTasks = tasks[idTodoList]
    const task = newTasks.find(el => el.id === id)
    if (task) {
      task.title = newTitleTask
      setTasks({ ...tasks })
    }
  }

  const changeTodoListTitle = (newTitleTodoList: string, idTodoList: string) => {
    const todoList = todoLists.find(el => el.id === idTodoList)
    if (todoList) {
      todoList.title = newTitleTodoList
      setTodoLists([...todoLists])
    }
  }

  return (
    <div className="App">
      <InputAddItemForm addItem={addTodoList} />

      {todoLists.map(tl => {

        let tasksForTodolist = tasks[tl.id]

        const changeStatusFilter = (status: TypeFilterTask, idTodoList: string) => {
          const todoList = todoLists.find(el => el.id === idTodoList)
          if (todoList) {
            todoList.filter = status
            setTodoLists([...todoLists])
          }
        }

        if (tl.filter === 'completed') {
          tasksForTodolist = tasksForTodolist.filter(el => el.isDone)
        }
        if (tl.filter === 'active') {
          tasksForTodolist = tasksForTodolist.filter(el => !el.isDone)
        }

        return <TodoList
          key={tl.id}
          id={tl.id}
          title={tl.title}
          tasks={tasksForTodolist}
          removeTask={removeTask}
          changeStatusFilter={changeStatusFilter}
          addTask={addTask}
          changeTaskStatus={changeTaskStatus}
          filter={tl.filter}
          removeTodoList={removeTodoList}
          changeTitleTask={changeTitleTask}
          changeTodoListTitle={changeTodoListTitle}
        />
      })}

    </div>
  );
}

export default App;
