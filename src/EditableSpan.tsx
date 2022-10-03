import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export type EditableSpanPropsType = {
    title: string
    onChange: (newValue:string) => void
}
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
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

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            activateViewMode()
        }
    }

    return (
        editMode
            ? <input type="text" value={title}
                     onChange={onChangeHandler}
                     onKeyPress={onKeyPressHandler}
                     onBlur={activateViewMode}
                     autoFocus />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
})