import React, { useState } from 'react';
import './App.css';
import TodoList, { TasksType } from './components/TodoList/TodoList';
import { v1 } from 'uuid';

export type TypeFilterTask = 'all' | 'completed' | 'active'

function App() {

  const [tasks1, setTasks1] = useState<Array<TasksType>>([
    { id: v1(), title: 'js', isDone: true },
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'HTML', isDone: false }
  ])

  const [filter, setFilter] = useState<TypeFilterTask>('all')

  let tasksForTodolist = tasks1

  const changeStatusFilter = (status: TypeFilterTask) => {
    setFilter(status)
  }

  const removeTask = (id: string) => {
    let filteredTasks = tasks1.filter(el => el.id !== id)
    setTasks1(filteredTasks)
  }

  const addTask = (title: string) => {
    let newTask = {id: v1(), title: title, isDone: false}
    let newArrTasks = [newTask, ...tasks1]
    setTasks1(newArrTasks)
  }

  const changeTaskStatus = (id:string, status: boolean) => {
    const task = tasks1.find(el => el.id === id)
    if(task) {
      task.isDone = status
    }
    setTasks1([...tasks1])
  }

  if (filter === 'completed') {
    tasksForTodolist = tasks1.filter(el => el.isDone)
  }
  if (filter === 'active') {
    tasksForTodolist = tasks1.filter(el => !el.isDone)
  }

  return (
    <div className="App">
      <TodoList title="React-todolist-1"
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeStatusFilter={changeStatusFilter}
        addTask = {addTask}
        changeTaskStatus={changeTaskStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
