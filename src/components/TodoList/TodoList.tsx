import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { TypeFilterTask } from '../../App';

export type TasksType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TasksType>
  removeTask: (id: string) => void
  changeStatusFilter: (status: TypeFilterTask) => void
  addTask: (title: string) => void
}

function TodoList(props: PropsType) {
<<<<<<< HEAD
  const removeTask = (id:number) => {
    props.tasks.filter(el => { el.id !== id })
  }
=======

  const [titleNewtask, setTitleNewTask] = useState('')
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleNewTask(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      props.addTask(titleNewtask)
      setTitleNewTask('')
    }
  }
  const addTask = () => {
    props.addTask(titleNewtask)
    setTitleNewTask('')
  }
  const changeStatusFilterAll = () => props.changeStatusFilter('all')
  const changeStatusFilterActive = () => props.changeStatusFilter('active')
  const changeStatusFilterCompleted = () => props.changeStatusFilter('completed')

>>>>>>> refs/remotes/origin/master
  return (
    <div>
      <h2>{props.title}</h2>
      <div>
        <input value={titleNewtask} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} />
        <button onClick={addTask}>+</button>
      </div>
      <div>
        <ul>
<<<<<<< HEAD
          {props.tasks.map(input => {
            return <li>
              <input type="checkbox" checked={input.isDone} />
              <span>{input.title}</span>
              <button onClick={() => {removeTask(input.id)}}>-</button>
=======
          {props.tasks.map(t => {
            const removeTaskHandler = () => {
              props.removeTask(t.id)
            }
            return <li key={t.id}><input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>
              <button onClick={removeTaskHandler}>-</button>
>>>>>>> refs/remotes/origin/master
            </li>
          })}
        </ul>
      </div>
      <div>
        <button onClick={changeStatusFilterAll}>All</button>
        <button onClick={changeStatusFilterActive}>Active</button>
        <button onClick={changeStatusFilterCompleted}>Completed</button>
      </div>
    </div>
  );
}

export default TodoList;