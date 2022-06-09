import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {

    const tasks1: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: false},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ]

    const tasks2: Array<TaskType> = [
        {id: 1, title: "Terminator", isDone: true},
        {id: 2, title: "Rome", isDone: false},
        {id: 3, title: "Dune", isDone: false}
    ]

    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={tasks1} />
            <Todolist title={"Movies"} tasks={tasks2}/>

        </div>
    );
}

export default App;
