import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type PropsInputItemFormType = {
  addItem: (title: string) => void
}

function InputAddItemForm(props: PropsInputItemFormType) {

  const [titleNewTask, setTitleNewTask] = useState('')
  const [error, setError] = useState('')

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleNewTask(e.currentTarget.value)
    setError('')
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError('')
    if (e.charCode === 13 && titleNewTask !== '') {
      addTask()
    } 
  }

  const addTask = () => {
    if (titleNewTask.trim() !== '') {
      props.addItem(titleNewTask)
      setTitleNewTask('')
    } else {
      setError('Title is required!!!')
    }
  }

  return (
    <div>
      <input value={titleNewTask}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? 'error' : ''}
      />
      <button onClick={addTask}>+</button>
      {error && <div className='error-message' >{error}</div>}
    </div>
  );
}

export default InputAddItemForm;