import {useReducer} from "react";

type Task = {
    title: string;
    details: string;
    isDone: boolean;
}

type TodoListStateProps = {
    maxTasks: number;
    listOfTasks?: Array<Task>;
}

type TodoListState = {
    listOfTasks: Array<Task>;
}

type TodoListActions = {

}

const useTodoListState = ({ maxTasks, listOfTasks }: TodoListStateProps) => {

    const initialTasks =
    const tasksReducer = () => {

    }
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)
}