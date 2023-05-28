import React from 'react';
import './App.css';
import TodoList, { TasksType } from './components/TodoList/TodoList';

const tasks1: Array<TasksType> = [
  {id: 1, title:'js', isDone: true},
  {id: 2, title:'CSS', isDone: true},
  {id: 3, title:'HTML', isDone: false}
]

const tasks2: Array<TasksType> = [
  {id: 1, title:'No js', isDone: true},
  {id: 2, title:'No CSS', isDone: false},
  {id: 3, title:'No HTML', isDone: true}
]

function App() {
  return (
    <div className="App">
      <TodoList title="React-todolist-1" tasks={tasks1}/>
      <TodoList title="React-todolist-2" tasks={tasks2}/>
    </div>
  );
}

export default App;
