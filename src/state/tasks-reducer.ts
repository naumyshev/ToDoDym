import {TasksStateType} from "../App";
import {v1} from "uuid";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TITLE-STATUS'
    taskId: string
    title: string
    todolistId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {

    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state};
            const tasks = state[action.todolistId]
            const filteredtasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredtasks
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks

            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const sateCopy = {...state}
            const tasks = sateCopy[action.todolistId]
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return sateCopy
        }
        case 'CHANGE-TITLE-STATUS': {
            const sateCopy = {...state}
            const tasks = sateCopy[action.todolistId]
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return sateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: "REMOVE-TASK", todolistId: todolistId, taskId: taskId }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: "ADD-TASK", title: title, todolistId: todolistId }
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return { type: "CHANGE-TASK-STATUS", isDone: isDone, todolistId: todolistId, taskId: taskId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return { type: "CHANGE-TITLE-STATUS", title: title, todolistId: todolistId, taskId: taskId}
}