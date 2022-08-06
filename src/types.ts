export interface ITask {
    id: string
    title: string
    quantity: number
    description: string
    completed: boolean
    act: number
}

export interface TasksState {
    tasksList: ITask[]
    activeTaskId: string
    time: number
}

export interface TaskEditPayload {
    id: string
    newTitle: string
}