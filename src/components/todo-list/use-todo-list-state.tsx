import {useState} from "react";

export type Task = {
    id: string;
    title: string;
    details: string;
    isDone: boolean;
    isEditMode: boolean;
}

export type TodoListStateProps = {
    maxTasks: number;
    listOfTasks?: Array<Task>;
}

export type TodoListState = {
    listOfTasks: Array<Task>;
    error?: string;
}

export type TodoListActions = {
    updateTask: (task: Task) => void;
    deleteTask: (id: string) => void;
    addTask: (title: string, details: string) => void;
}

export const useTodoListState = ({ maxTasks, listOfTasks}: TodoListStateProps): [TodoListState, TodoListActions] => {

    const [todoListState, setTodoListState] = useState({ listOfTasks: listOfTasks ?? [] })

    const addTask = (title: string, details: string) => {
        setTodoListState(prevState => {
            const newTask: Task = {
                id: crypto.randomUUID(),
                title,
                details,
                isDone: false,
                isEditMode: false
            }
            if (prevState.listOfTasks.length < maxTasks) {
                return {...prevState, listOfTasks: [...prevState.listOfTasks, newTask], error: null}
            } else {
                return {...prevState, error: 'Too many tasks being saved.'}
            }
        })
    }

    const updateTask = (
        {id, title, details, isDone, isEditMode}: Task
    ) => {
        console.log({id, title, details, isDone, isEditMode})
        setTodoListState(prevState => {
            const task = prevState.listOfTasks.find(task => task.id === id);
            if (!task) {
                return {...prevState, error: 'Task cannot be updated.'}
            }
            const newTaskList = prevState.listOfTasks.map(task =>
                task.id === id ? { ...task, title, details, isDone, isEditMode } : task
            );
            return {...prevState, listOfTasks: newTaskList, error: null}
        })
    }

    const deleteTask = (id: string) => {
        setTodoListState(prevState => {
            const task = prevState.listOfTasks.find(task => task.id === id);
            if (!task) {
                return {...prevState, error: 'Task could not be found.'}
            }
            const newTaskList = prevState.listOfTasks.filter( task => task.id !== id)
            return {...prevState, listOfTasks: newTaskList, error: null}
        })
    }

    return [todoListState, {
       updateTask,
        deleteTask,
        addTask
    }]
}