import {useReducer} from "react";

export type Task = {
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
    updateTask: (task: Task) => void;
    deleteTask: (task: Task) => void;
    createTask: (task: Task) => void;
    setIsDone: (isDone: boolean, task: Task) => void;
}
type Action =
    {type: 'UpdateTask'; payload: Task} |
    {type: 'DeleteTask'; payload: Task} |
    {type: 'CreateTask'; payload: Task} |
    {type: 'TaskIsDoneSet'; payload: Task};

const useTodoListState = ({ maxTasks, listOfTasks }: TodoListStateProps) => {

    const initialState = {
        listOfTasks: listOfTasks ?? []
    }
    const tasksReducer: React.Reducer<TodoListState, Action> = (toDoListState: TodoListState, actions) => {

    }
    const [tasks, dispatch] = useReducer(initialState)
}