import React, { ChangeEvent, useState } from 'react';

type TypePropsEditableTask = {
  title: string
  changeTitle: (newTitleTask: string) => void
}

function EditableItem(props: TypePropsEditableTask) {

  const [activeTask, setActiveTask] = useState(false)
  const [editTitle, setEditTitle] = useState('')

  const activeTaskHandler = () => {
    setActiveTask(!activeTask)
    setEditTitle(props.title)
    props.changeTitle(editTitle)
  }

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.currentTarget.value)
  }

  return (
    activeTask ? <input onChange={changeTitleHandler} value={editTitle} onBlur={activeTaskHandler} autoFocus /> : <span onDoubleClick={activeTaskHandler} >{props.title}</span>
  );
}

export default EditableItem;