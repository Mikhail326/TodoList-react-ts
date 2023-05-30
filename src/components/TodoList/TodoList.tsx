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
  filter:TypeFilterTask
  removeTask: (id: string) => void
  changeStatusFilter: (status: TypeFilterTask) => void
  addTask: (title: string) => void
  changeTaskStatus: (id: string, status: boolean) => void
}

function TodoList(props: PropsType) {

  const [titleNewtask, setTitleNewTask] = useState('')
  const [error, setError] = useState('')

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleNewTask(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError('')
    if (e.charCode === 13) {
      props.addTask(titleNewtask)
      setTitleNewTask('')
    }
  }
  const addTask = () => {
   if(titleNewtask.trim() !== '') {
    props.addTask(titleNewtask)
    setTitleNewTask('')
   } else {
    setError('Titlte is required')
   }
  }
  const changeStatusFilterAll = () => props.changeStatusFilter('all')
  const changeStatusFilterActive = () => props.changeStatusFilter('active')
  const changeStatusFilterCompleted = () => props.changeStatusFilter('completed')

  return (
    <div>
      <h2>{props.title}</h2>
      <div>
        <input  value={titleNewtask} 
        onChange={onChangeHandler} 
        onKeyPress={onKeyPressHandler} 
        className={error ? 'error' : ''}/>
        <button onClick={addTask}>+</button>
       {error &&  <div className='error-message' >{error}</div>}
      </div>
      <div>
        <ul>
          {props.tasks.map(t => {
            const removeTaskHandler = () => {
              props.removeTask(t.id)
            }
            const changeTaskStatusHander = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(t.id, e.currentTarget.checked)
            }
            return <li key={t.id} className={t.isDone ? 'is-done': ''}><input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHander} />
              <span>{t.title}</span>
              <button onClick={removeTaskHandler}>-</button>
            </li>
          })}
        </ul>
      </div>
      <div>
        <button className={props.filter === 'all' ? 'active-status-filter': ''} 
        onClick={changeStatusFilterAll}>All</button>
        <button className={props.filter === 'active' ? 'active-status-filter': ''}
        onClick={changeStatusFilterActive}>Active</button>
        <button className={props.filter === 'completed' ? 'active-status-filter': ''}
        onClick={changeStatusFilterCompleted}>Completed</button>
      </div>
    </div>
  );
}

export default TodoList;