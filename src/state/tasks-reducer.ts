import {TasksStateType} from "../App";

export type Action1Type = {
    type: '1'
    id: string
}

export type Action2Type = {
    type: '2'
    id: string
}

type ActionType = Action1Type | Action2Type

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "1": {
            return state
        }
        case "2": {
            return state
        }
        default: return state
    }
}



