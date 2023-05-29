import React from 'react';
import { TypeFilterTask } from '../../App';

export type TasksType = {
  id: number
  title: string
  isDone: boolean
} 

type PropsType = {
  title: string
  tasks: Array<TasksType>
  removeTask: (id: number) => void
  changeStatusFilter: (status: TypeFilterTask) => void
}

function TodoList(props:PropsType) {
  return (
    <div>
      <h2>{props.title}</h2>
      <div>
        <input type="date" />
      </div>
      <div>
        <ul>
          {props.tasks.map(t => {
            return <li><input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={() => props.removeTask(t.id)}>-</button>
            </li>
          })}
        </ul>
      </div>
      <div>
        <button onClick={() => props.changeStatusFilter('all')}>All</button>
        <button onClick={() => props.changeStatusFilter('active')}>Active</button>
        <button onClick={() => props.changeStatusFilter('completed')}>Completed</button>
      </div>
    </div>
  );
}

export default TodoList;