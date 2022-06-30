import {TasksStateType} from "../App";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

export type Action2Type = {
    type: '2'
    title: string
}

type ActionsType = RemoveTaskActionType | Action2Type

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {

    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state};
            const tasks = state[action.todolistId]
            const filteredtasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredtasks
            return stateCopy
        }
        case "2": {
            return {...state}
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: "REMOVE-TASK", todolistId: todolistId, taskId: taskId }
}

export const action2AC = (): Action2Type => {
    return { type: "2", title: ''}
}