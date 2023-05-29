import React from 'react';

export type TasksType = {
  id: number
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TasksType>
}

function TodoList(props: PropsType) {
  const removeTask = (id:number) => {
    props.tasks.filter(el => { el.id !== id })
  }
  return (
    <div>
      <h2>{props.title}</h2>
      <div>
        <input type="date" />
      </div>
      <div>
        <ul>
          {props.tasks.map(input => {
            return <li>
              <input type="checkbox" checked={input.isDone} />
              <span>{input.title}</span>
              <button onClick={() => {removeTask(input.id)}}>-</button>
            </li>
          })}
        </ul>
      </div>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
}

export default TodoList;