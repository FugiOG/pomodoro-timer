import React, { FC, useState } from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import classNames from 'classnames'
import { editTask, removeTask } from '../store/slices/tasksSlice'
import { ITask } from '../types'

declare var confirm: (str: string) => boolean 

const TaskEdit: FC<{editingId: string, onCancel: () => void}> = ({editingId, onCancel}) => {
    const {tasksList} = useAppSelector(state => state.tasks)
    const dispatch = useAppDispatch();
    const {id, title, quantity, description, act, completed} = tasksList.filter(item => item.id === editingId)[0]


    const [newTitle, setNewTitle] = useState<string>(title)
    const [newQuantity, setNewQuantity] = useState<number>(quantity);
    const [newAct, setNewAct] = useState<number>(act)
    const [shouldDescription, setShouldDescription] = useState<boolean>(false);
    const [newDescription, setNewDescription] = useState<string>(description);

    const handleEditTask = () => {
        if (newQuantity && newTitle) {
            if (!confirm('Вы действительно хотите изменить задачу?')) return
            const newTask: ITask = {
                id,
                title: newTitle,
                quantity: newQuantity,
                description: newDescription,
                completed,
                act: newAct
              }
              dispatch(editTask(newTask))
              onCancel()
        }
    }
    
    const increaseQuantity = () => {
        setNewQuantity(prev => prev + 1)
      }
    
      const decreaseQuantity = () => {
        if (quantity > 0){
          setNewQuantity(prev => prev - 1)
        }
      }

    return (
        <div className='add-task-form' tabIndex={1}>
            <form>
            <input type="text" className='browser-default task-title' placeholder='What are you working on?' value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
            <p className='est'>Act / Est Pomodoros</p>
            <div className="task-est gap-1">
                <input type="number" className='browser-default edit-form-act' min='0' step='1' value={newAct} onChange={(e) => setNewAct(+e.target.value)}/>
                <input type="number" className='browser-default' min='0' step='1' value={newQuantity} onChange={(e) => setNewQuantity(+e.target.value)}/>
                <i className="material-icons btn non-copyable" onChange={increaseQuantity}>arrow_drop_up</i>
                <i className="material-icons btn non-copyable" onChange={decreaseQuantity}>arrow_drop_down</i>
            </div>
            {(newDescription || shouldDescription) ? 
                <textarea placeholder='Some notes...' className='description' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                :
                <button className='browser-default add-note-btn' onClick={() => setShouldDescription(true)}>+Add Note</button>}
            </form>
            <div className='bottom-form-btn'>
                <button className='remove-btn' onClick={() => dispatch(removeTask(id))}>delete</button>
                <button className='cancel-btn' onClick={onCancel}>Cancel</button>
                <button className={classNames('save-btn', {'active':  (newTitle && newQuantity)})} disabled={!(newTitle && newQuantity)} onClick={handleEditTask}>Save</button>
            </div>
        </div>
    )
}

export default TaskEdit
