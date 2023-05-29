import React, { useState } from 'react';
import './App.css';
import TodoList, { TasksType } from './components/TodoList/TodoList';

export type TypeFilterTask = 'all' | 'completed' | 'active'

function App() {

  const [tasks1, setTasks1] = useState<Array<TasksType>>([
    { id: 1, title: 'js', isDone: true },
    { id: 2, title: 'CSS', isDone: true },
    { id: 3, title: 'HTML', isDone: false }
  ])

  const [filter, setFilter] = useState<TypeFilterTask>('all')

  let tasksForTodolist = tasks1

const changeStatusFilter = (status:TypeFilterTask) => {
  setFilter(status)
}

  const removeTask = (id: number) => {
    let filteredTasks = tasks1.filter(el => el.id !== id)
    setTasks1(filteredTasks)
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
      />
    </div>
  );
}

export default App;
