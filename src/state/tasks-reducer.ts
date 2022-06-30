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

        default:
            return state
    }
}