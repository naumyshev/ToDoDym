import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


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
    changeTaskTitle: (taskID: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist = (props: PropsType) => {

    const changeFilterHandler = (value: FilterValuesType) => props.changeFilter(value, props.id)

    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolistHandler}>x</button>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul>
                {
                    props.tasks.map((t) => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }

                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }

                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }

                        return (
                            <li key={t.id}>
                                <input type="checkbox"
                                       onChange={onChangeStatusHandler}
                                       checked={t.isDone}
                                />
                                <span className={t.isDone ? 'is-done' : ""}>
                                    <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                                </span>
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

