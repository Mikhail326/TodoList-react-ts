import React, { ChangeEvent } from 'react';
import { TypeFilterTask } from '../../App';
import InputAddItemForm from '../InputAddItemForm/InputAddItemForm';
import EditableItem from '../EditableItem/EditableItem';

export type TasksType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TasksType>
  filter: TypeFilterTask
  id: string
  removeTask: (id: string, idTodoList: string) => void
  changeStatusFilter: (status: TypeFilterTask, idTodoList: string) => void
  addTask: (title: string, idTodoList: string) => void
  changeTaskStatus: (id: string, status: boolean, idTodoList: string) => void
  removeTodoList: (idTodoList: string) => void
  changeTitleTask: (id: string, newTitleTask: string, idTodoList: string) => void
  changeTodoListTitle: (newTitle: string, idTodoList:string) => void
}

function TodoList(props: PropsType) {

  const changeStatusFilterAll = () => props.changeStatusFilter('all', props.id)
  const changeStatusFilterActive = () => props.changeStatusFilter('active', props.id)
  const changeStatusFilterCompleted = () => props.changeStatusFilter('completed', props.id)

  const removeTodoListHandler = () => {
    props.removeTodoList(props.id)
  }

  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }

  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(newTitle, props.id)
  }

  return (
    <div>
      <h2><EditableItem title={props.title} changeTitle={changeTodoListTitle} /></h2>
      <button onClick={removeTodoListHandler}>Delete TodoList</button>
      <InputAddItemForm addItem={addTask} />
      <div>
        <ul>
          {props.tasks.map(t => {
            const removeTaskHandler = () => {
              props.removeTask(t.id, props.id)
            }
            const changeTaskStatusHander = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
            }
            const changeTitleTask = (newTitleTask: string) => {
              props.changeTitleTask(t.id, newTitleTask, props.id)
            }
            return <li key={t.id} className={t.isDone ? 'is-done' : ''}><input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHander} />
              <EditableItem title={t.title} changeTitle={changeTitleTask} />
              <button onClick={removeTaskHandler}>-</button>
            </li>
          })}
        </ul>
      </div>
      <div>
        <button className={props.filter === 'all' ? 'active-status-filter' : ''}
          onClick={changeStatusFilterAll}>All</button>
        <button className={props.filter === 'active' ? 'active-status-filter' : ''}
          onClick={changeStatusFilterActive}>Active</button>
        <button className={props.filter === 'completed' ? 'active-status-filter' : ''}
          onClick={changeStatusFilterCompleted}>Completed</button>
      </div>
    </div>
  );
}

export default TodoList;