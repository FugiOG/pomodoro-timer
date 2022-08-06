import classNames from 'classnames';
import React, { FC, useState } from 'react'
import { ITask } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addTask } from '../store/slices/tasksSlice';

const TasksForm: FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [shouldDescription, setShouldDescription] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');

  const dispatch = useAppDispatch();

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 0){
      setQuantity(prev => prev - 1)
    }
  }

  const handleAddTask = () => {
    if (quantity && title){
      const newTask: ITask = {
        id: uuidv4(),
        title,
        quantity,
        description,
        completed: false,
        act: 0
      }
      dispatch(addTask(newTask))
      setDescription('')
      setQuantity(1)
      setTitle('')
      setShouldDescription(false)
    }
  }

  // const onStopHandle = (event: FocusEvent<HTMLDivElement>) => {
  //   if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.tagName === 'BUTTON'|| event.target.tagName === 'SPAN' ) return
  //   console.log(event.target.tagName)
  //   setShowForm(false)
  // }

  return (
    <>{showForm ? 
      <div className='add-task-form' tabIndex={1}>
        <form>
          <input type="text" className='browser-default task-title' placeholder='What are you working on?' value={title} onChange={(e) => setTitle(e.target.value)}/>
          <p className='est'>Est Pomodoros</p>
          <div className="task-est">
            <input type="number" className='browser-default' min='0' step='1' value={quantity} onChange={(e) => setQuantity(+e.target.value)}/>
            <i className="material-icons btn non-copyable" onClick={increaseQuantity}>arrow_drop_up</i>
            <i className="material-icons btn non-copyable" onClick={decreaseQuantity}>arrow_drop_down</i>
          </div>
          {shouldDescription ? 
            <textarea placeholder='Some notes...' className='description' value={description} onChange={(e) => setDescription(e.target.value)}/>
            :
            <button className='browser-default add-note-btn' onClick={() => setShouldDescription(true)}>+Add Note</button>}
        </form>
        <div className='bottom-form-btn'>
          <button className='cancel-btn' onClick={() => setShowForm(false)}>Cancel</button>
          <button className={classNames('save-btn', {'active':  (title && quantity)})} disabled={!(title && quantity)} onClick={handleAddTask}>Save</button>
        </div>
      </div>
      :
      <button className='add-task-button red darken-3' onClick={() => setShowForm(true)} tabIndex={1}> 
          <i className="material-icons">add</i>Add task
      </button>
    }
    </>
  )
}

export default TasksForm
