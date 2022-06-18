import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
}

export const Todolist = (props: PropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")
     const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTask()
        }
    }
    const addTask = () => {

        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle.trim(), props.id)
            setNewTaskTitle("")
        } else {
            setError("Field is required")
        }
    }
    const changeFilterHandler = (value: FilterValuesType) => props.changeFilter(value, props.id)
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }


    return (
        <div>
            <h3>{props.title} <button onClick={removeTodolistHandler}>x</button></h3>
            <div>
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ?'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>Field is required</div>}
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }

                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }

                        return (
                            <li key={t.id}>
                                <input type="checkbox"
                                       onChange={onChangeStatusHandler}
                                       checked={t.isDone}
                                />
                                <span className={t.isDone ? 'is-done' : ""}>{t.title}</span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>)
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={() => changeFilterHandler("all")}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={() => changeFilterHandler("active")}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={() => changeFilterHandler("completed")}>Completed</button>
            </div>
        </div>
    )
}