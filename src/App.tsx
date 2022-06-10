import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: false},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (id: number) => {
        const filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    let tasksForTodolist = tasks
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter( t => t.isDone)
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter( t => !t.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
