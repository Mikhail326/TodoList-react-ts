import React, { ChangeEvent } from 'react';
import { TypeFilterTask } from '../../App';
import InputAddItemForm from '../InputAddItemForm/InputAddItemForm';
import EditableItem from '../EditableItem/EditableItem';
import { Button, Checkbox, IconButton } from '@mui/material';
import { VerifiedOutlined, Delete, Verified} from '@mui/icons-material';

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
  changeTodoListTitle: (newTitle: string, idTodoList: string) => void
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
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
            }
            const changeTitleTask = (newTitleTask: string) => {
              props.changeTitleTask(t.id, newTitleTask, props.id)
            }
            return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              <Checkbox
                onChange={changeTaskStatusHandler}
                checked={t.isDone}
                icon={<VerifiedOutlined />}
                checkedIcon={<Verified />}
              />
              <EditableItem title={t.title} changeTitle={changeTitleTask} />
              <IconButton aria-label="delete" size="small" onClick={removeTaskHandler}>
                <Delete fontSize="inherit" />
              </IconButton>
            </li>
          })}
        </ul>
      </div>
      <div>
        <Button variant={props.filter === 'all' ? 'contained' : 'outlined'}
          onClick={changeStatusFilterAll}>All</Button>
        <Button variant={props.filter === 'active' ? 'contained' : 'outlined'}
          onClick={changeStatusFilterActive}>Active</Button>
        <Button variant={props.filter === 'completed' ? 'contained' : 'outlined'}
          onClick={changeStatusFilterCompleted}>Completed</Button>
      </div>
    </div>
  );
}

export default TodoList;