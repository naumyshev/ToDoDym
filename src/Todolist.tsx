import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export const Todolist = (props: PropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle("")
    }
    const changeFilterHandler = (value: FilterValuesType) => props.changeFilter(value)

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id)
                        }
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>x
                                </button>
                            </li>)
                    })
                }
            </ul>
            <div>
                <button onClick={() => changeFilterHandler("all")}>All</button>
                <button onClick={() => changeFilterHandler("active")}>Active</button>
                <button onClick={() => changeFilterHandler("completed")}>Completed</button>
            </div>
        </div>
    )
}