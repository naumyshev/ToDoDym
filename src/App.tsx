import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: false},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (id: string) => {
        const filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }
    
    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find( t => t.id === taskId)
        if (task) { // если существует
            task.isDone = isDone
        }
        setTasks([...tasks])

    }

    let tasksForTodolist = tasks
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
            />
        </div>
    );
}

export default App;
