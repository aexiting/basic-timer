import React, {useState} from "react";
import {Task, TodoListActions, TodoListState} from "./use-todo-list-state";


export type TodoListProps = {
    todoListState: TodoListState,
    todoListActions: TodoListActions
}

export type SingleTaskProps = Task & {
    setIsDone: () => void;
    setEditMode: () => void;
    updateTask: (title: string, details: string) => void;
}

export const SingleTask = ({ id,
                               title,
                               details,
                               isDone,
                               setIsDone,
                               isEditMode,
                               setEditMode,
                               updateTask
                           }: SingleTaskProps) => {

    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedDetails, setUpdatedDetails] = useState(details);


    return (
        <li key={id} id={'task-row-' + id}>
        <div className={'task-row-container ' + isDone ? 'completed-task-row' : ''}>
            {isEditMode ?
                <input
                    type="text"
                    value={updatedTitle}
                    onChange={event => setUpdatedTitle(event.target.value)}
                /> :
                <h3 className="task-row-title">
                <text string={title}/>
            </h3>
            }
            {isEditMode ?                 <input
                    type="text"
                    value={updatedDetails}
                    onChange={event => setUpdatedDetails(event.target.value)}
                />:
                <text string={details}/>
            }
            <button onClick={() => setIsDone()} className="timer-button">
                {"Done"}
            </button>
            {
                isEditMode ?
                    <button onClick={() => {
                        setEditMode()
                        updateTask(updatedTitle, updatedDetails)
                    }} className="timer-button">
                        {"Finish"}
                    </button> :
                    <button onClick={() => {
                        setEditMode()
                    }} className="timer-button">
                        {"Edit"}
                    </button>
            }
        </div>
        </li>
    )
}

export const TodoList = ({todoListActions, todoListState}: TodoListProps) => {
    return (
        <div className="todo-list-container">
            <ul>
                {
                    todoListState.listOfTasks.map(task => (
                        <SingleTask
                            id={task.id}
                            title={task.title}
                            details={task.details}
                            isDone={task.isDone}
                            setIsDone={ () =>  todoListActions.updateTask({...task, isDone: !task.isDone})}
                            isEditMode={task.isEditMode}
                            setEditMode={ () =>  todoListActions.updateTask({...task, isEditMode: !task.isEditMode})}
                            updateTask={(title, details) => todoListActions.updateTask({...task, details, title})}
                        />
                    ))
                    }
            </ul>
        </div>
    )
}