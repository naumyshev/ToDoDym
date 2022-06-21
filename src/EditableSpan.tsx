import React, {ChangeEvent, useState} from "react";

export type EditableSpanPropsType = {
    title: string
    onChange: (newValue:string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMode
            ? <input value={title} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}