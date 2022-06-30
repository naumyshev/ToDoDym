import {TasksStateType} from "../App";

export type Action1Type = {
    type: '1'
    id: string
}

export type Action2Type = {
    type: '2'
    title: string
}

type ActionsType = Action1Type | Action2Type

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {

    switch (action.type) {
        case "1": {
            return {...state}
        }
        case "2": {
            return {...state}
        }
        default:
            return state
    }
}

export const action1AC = (): Action1Type => {
    return { type: "1", id: ''}
}

export const action2AC = (): Action2Type => {
    return { type: "2", title: ''}
}