import {TasksStateType, TodolistType} from "../App";
import {addTodolistAC, AddTodolistActionType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('IDs should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action: AddTodolistActionType = addTodolistAC('new todolist')

    const endTasksState:TasksStateType = tasksReducer(startTasksState, action)
    const endTodolistState: Array<TodolistType> = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})