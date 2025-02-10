import {useState} from "react";

export type Task = {
    id: string;
    title: string;
    details: string;
    isDone: boolean;
}

export type TodoListStateProps = {
    maxTasks: number;
    listOfTasks?: Array<Task>;
}

export type TodoListState = {
    listOfTasks: Array<Task>;
}

export type TodoListActions = {
    updateTask: ({id, title, details, isDone}: {     id: string;     title: string;     details: string;     isDone: boolean; }) => void;
    deleteTask: (id: string) => void;
    addTask: (title: string, details: string) => void;
}

const useTodoListState = ({ maxTasks, listOfTasks}: TodoListStateProps): [TodoListState, TodoListActions] => {

    const [todoListState, setTodoListState] = useState({ listOfTasks: listOfTasks ?? [] })

    const addTask = (title: string, details: string) => {
        setTodoListState(prevState => {
            const newTask: Task = {
                id: crypto.randomUUID(),
                title,
                details,
                isDone: false
            }
            if (prevState.listOfTasks?.length < maxTasks) {
                return {...prevState, listOfTasks: [...prevState.listOfTasks, newTask]}
            } else {
                throw new Error('Too many tasks being saved.');
            }
        })
    }

    const updateTask = (
        {id, title, details, isDone}: { id: string, title: string, details: string, isDone: boolean }
    ) => {
        setTodoListState(prevState => {
            const task = prevState.listOfTasks.find(task => task.id === id);
            if (!task) {
                throw new Error('Cannot update task since it was not found.');
            }
            const newTaskList = prevState.listOfTasks.map(task =>
                task.id === id ? { ...task, title, details, isDone } : task
            );
            return {...prevState, listOfTasks: newTaskList}
        })
    }

    const deleteTask = (id: string) => {
        setTodoListState(prevState => {
            const task = prevState.listOfTasks.find(task => task.id === id);
            if (!task) {
                throw new Error('Cannot delete task since it was not found.');
            }
            const newTaskList = prevState.listOfTasks.filter( task => task.id !== id)
            return {...prevState, listOfTasks: newTaskList}
        })
    }

    return [todoListState, {
       updateTask,
        deleteTask,
        addTask
    }]
}