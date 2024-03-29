import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [todolistID: string]: Array<TaskType>
}

function App() {

    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID_1, title: "What to learn", filter: 'all'},
        {id: todolistID_2, title: "What to buy", filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todolistID_2]: [
            {id: v1(), title: "Sugar", isDone: true},
            {id: v1(), title: "Salt", isDone: true},
            {id: v1(), title: "Oil", isDone: false},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Beer", isDone: false}
        ]
    })

    const removeTodolist =(todolistId: string) => {
        setTodolists(todolists.filter(tl=> tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const changeTodolistTitle = (id: string, newTitle: string) => {
        const todolist = todolists.find(tl => tl.id=== id)
        if(todolist){
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }
    const addTodolist = (title: string) => {
        const todolist: TodolistType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodolists([todolist, ...todolists])
        setTasks({...tasks, [todolist.id]:[]})
    }
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }

    }

    const removeTask = (id: string, todolistId: string) => {
        const filteredTasks = tasks[todolistId].filter(t => t.id !== id)
        setTasks({...tasks, [todolistId]: filteredTasks})
    }
    const addTask = (title: string, todolistId: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let task = tasks[todolistId].find(t => t.id === taskId)
        if (task) { // если существует
            task.isDone = isDone
            setTasks({...tasks, [todolistId]: tasks[todolistId]})
        }
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        let task = tasks[todolistId].find(t => t.id === taskId)
        if (task) { // если существует
            task.title = newTitle
            setTasks({...tasks, [todolistId]: tasks[todolistId]})
        }
    }

    return (
        <div className="App">

            <div>
                <h3>Add Todolist</h3>
                <AddItemForm
                    addItem={addTodolist}
                />
            </div>
            {
                todolists.map((tl) => {

                    let tasksForTodolist = tasks[tl.id]
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
                    }
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
                    }

                    return (
                        <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            filter={tl.filter}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                            removeTodolist={removeTodolist}
                        />
                    )
                })
            }


        </div>
    );
}

export default App;
