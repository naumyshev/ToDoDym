import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id, props.todolistId])

    return (
        <li key={props.task.id}>
            <input type="checkbox"
                   onChange={onChangeStatusHandler}
                   checked={props.task.isDone}
            />
            <span className={props.task.isDone ? 'is-done' : ""}>
                <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
            </span>
            <button onClick={onRemoveHandler}>x</button>
        </li>)
})