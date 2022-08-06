import classNames from 'classnames'
import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { setTasks, toggleActiveTaskId, toggleCompleted } from '../store/slices/tasksSlice'
import { ITask } from '../types'
import TaskEdit from './TaskEdit'


const TasksList: FC = () => {
    const [editingId, setEditingId] = useState<string>('');

    const {tasksList, activeTaskId} = useAppSelector(store => store.tasks)
    const dispatch = useAppDispatch();
    
    const initActiveTask = () => {
        if (!activeTaskId && (tasksList.length !== 0)){
            dispatch(toggleActiveTaskId(tasksList[0].id))
        }
    }

    useEffect(() => {
        const savedList = JSON.parse(localStorage.getItem('tasksList') || '[]') as ITask[]
        dispatch(setTasks(savedList))
        const savedActive = localStorage.getItem('activeId') || ''
        dispatch(toggleActiveTaskId(savedActive))
      }, [])
    
    useEffect(() => {
        initActiveTask()
        localStorage.setItem('tasksList', JSON.stringify(tasksList))
        localStorage.setItem('activeId', activeTaskId)
    }, [tasksList, activeTaskId])

      
    

    // const onEditTitle = (id: string, oldTitle: string) => {
    //     if (oldTitle !== newTitle){
    //         if (newTitle){
    //             if (confirm('Вы точно хотите изменить задачу?')){
    //                 dispatch(editTaskTitle({id, newTitle}))
    //                 setNewTitle('')
    //             }
    //         }else {
    //             setNewTitle(oldTitle)
    //         }
    //     }
    // }

    // const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>, id: string, oldTitle: string) => {
    //     if (event.code === 'Enter'){
    //         onEditTitle(id, oldTitle)
    //     }
    // }


    return (
        <div className='tasks-list'>
            <div className='title'>
                <p>Tasks</p>
            </div>
            <div className='tasks-container'>
                {tasksList.map(task => {
                    const {id, title, description, quantity, completed, act} = task
                    if (editingId === id){
                        return <TaskEdit key={id} editingId={editingId} onCancel={() => setEditingId('')}/>
                    }
                    return(
                        <div key={id} className={classNames('task', {'active-task': activeTaskId === id})} onClick={(e) => dispatch(toggleActiveTaskId(id))}>
                            <div className="task-info">
                                <i className={classNames("material-icons", "non-copyable" ,"small","task-complete", {"completed": completed})} onClick={() => dispatch(toggleCompleted(id))}>check_circle</i>
                                {/* <input type="text" className='browser-default task-name' value={isEditing && editingId === id ? newTitle : title} onFocus={() => onStartFocus(title, id)} onChange={(e) => setNewTitle(e.target.value)} onBlur={() => onStopFocus(id, title)} onKeyPress={(e) => handleKeyPress(e, id, title)}/> */}
                                <div className={classNames("task-name", {"completed": completed})}>{title}</div>
                                <div className='task-progress'>{act}<div className='task-progress-small'>/{quantity}</div></div>
                                <i className="material-icons task-more non-copyable small" onClick={() => setEditingId(id)}>more_vert</i>
                            </div>
                            {description && 
                                <div className="descr">
                                    {description}
                                </div>
                            }
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default TasksList


// import classNames from 'classnames'
// import React, { FC, useState, KeyboardEvent } from 'react'
// import { useAppDispatch } from '../hooks/useAppDispatch'
// import { useAppSelector } from '../hooks/useAppSelector'
// import { editTaskTitle, removeTask, toggleCompleted } from '../store/slices/tasksSlice'

// declare var confirm: (str: string) => boolean

// const TasksList: FC = () => {
//     const [newTitle, setNewTitle] = useState<string>('');
//     const [isEditing, setIsEditing] = useState<boolean>(false);
//     const [editingId, setEditingId] = useState<string>('');

//     const tasksList = useAppSelector(store => store.tasks.tasksList)
//     const dispatch = useAppDispatch();

//     const onEditTitle = (id: string, oldTitle: string) => {
//         if (oldTitle !== newTitle){
//             if (newTitle){
//                 if (confirm('Вы точно хотите изменить задачу?')){
//                     dispatch(editTaskTitle({id, newTitle}))
//                     setNewTitle('')
//                 }
//             }else {
//                 setNewTitle(oldTitle)
//             }
//         }
//     }

//     const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>, id: string, oldTitle: string) => {
//         if (event.code === 'Enter'){
//             onEditTitle(id, oldTitle)
//         }
//     }

//     const onStopFocus = (id: string, title: string) => {
//         onEditTitle(id, title)
//         setIsEditing(false)
//         setEditingId('')
//     }

//     const onStartFocus = (title: string, id: string) => {
//         setEditingId(id)
//         setIsEditing(true)
//         setNewTitle(title)
//     }

//     return (
//         <div className='tasks-list'>
//             <div className='title'>
//                 <p>Tasks</p>
//             </div>
//             <div className='tasks-container'>
//                 {tasksList.map(task => {
//                     const {id, title, description, quantity, completed} = task
//                     return(
//                         <div key={id} className='task'>
//                             <div className="task-info">
//                                 <i className={classNames("material-icons", "non-copyable" ,"small","task-complete", {"completed": completed})} onClick={() => dispatch(toggleCompleted(id))}>check_circle</i>
//                                 <input type="text" className='browser-default task-name' value={isEditing && editingId === id ? newTitle : title} onFocus={() => onStartFocus(title, id)} onChange={(e) => setNewTitle(e.target.value)} onBlur={() => onStopFocus(id, title)} onKeyPress={(e) => handleKeyPress(e, id, title)}/>
//                                 <div className='task-progress'>0<div className='task-progress-small'>/{quantity}</div></div>
//                                 <i className="material-icons task-delete non-copyable small" onClick={() => dispatch(removeTask(id))}>delete_forever</i>
//                             </div>
//                             {description && 
//                                 <div className="descr">
//                                     {description}
//                                 </div>
//                             }
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     )
// }

// export default TasksList
