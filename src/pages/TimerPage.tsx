import React, { FC } from 'react'
import TasksForm from '../components/TasksForm'
import TasksList from '../components/TasksList'
import Timer from '../components/Timer'

const TimerPage: FC = () => {
  return (
    <>
     <Timer/>
     <div className="task-wraper">
      <TasksList/>
      <TasksForm/>
     </div>
    </>
  )
}

export default TimerPage
