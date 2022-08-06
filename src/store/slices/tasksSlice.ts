import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask, TaskEditPayload, TasksState } from "../../types";

const initialState: TasksState = {
    tasksList: [],
    activeTaskId: '',
    time: 25 * 60
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<ITask>) => {
            state.tasksList.push(action.payload)
        },
        removeTask: (state, action: PayloadAction<string>) => {
            state.tasksList = state.tasksList.filter(item => item.id !== action.payload)
        },
        toggleCompleted: (state, action: PayloadAction<string>) => {
            state.tasksList = state.tasksList.map(task => {
                if (task.id === action.payload){
                    task.completed = !task.completed
                }
                return task
            })
        },
        editTaskTitle: (state, action: PayloadAction<TaskEditPayload>) => {
            state.tasksList = state.tasksList.map(task => {
                if (task.id === action.payload.id){
                    task.title = action.payload.newTitle
                }
                return task
            })
            console.log(state.tasksList)
        },
        editTask: (state, action: PayloadAction<ITask>) => {
            state.tasksList = state.tasksList.map(item => {
                if (item.id === action.payload.id){
                    return action.payload
                }
                return item
            })
        },
        toggleActiveTaskId: (state, action: PayloadAction<string>) => {
            state.activeTaskId = action.payload
        },
        increaseAct: (state, action: PayloadAction<string>) => {
            state.tasksList = state.tasksList.map(item => {
                if (item.id === action.payload){
                    item.act += 1
                }
                return item
            })
        },
        setTasks: (state, action: PayloadAction<ITask[]>) => {
            state.tasksList = action.payload
        },
        setTime: (state, action: PayloadAction<number>) => {
            state.time = action.payload
        }
    }
})

export const {addTask, removeTask, toggleCompleted, editTask, toggleActiveTaskId, increaseAct, setTasks, setTime} = tasksSlice.actions
export default tasksSlice.reducer