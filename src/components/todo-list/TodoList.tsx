import React, { useState } from "react";
import { Task, TodoListActions, TodoListState } from "./use-todo-list-state";
import "./TodoList.css";  // Import the CSS file

export type TodoListProps = {
    todoListState: TodoListState,
    todoListActions: TodoListActions
}

export type SingleTaskProps = Omit<Task, 'id'> & {
    setIsDone: () => void;
    toggleEditMode: () => void;
    updateTask: (title: string, details: string) => void;
    deleteTask: () => void;
}

export const SingleTask = React.memo(({
                                          title,
                                          details,
                                          isDone,
                                          setIsDone,
                                          isEditMode,
                                          toggleEditMode,
                                          updateTask,
                                          deleteTask
                                      }: SingleTaskProps) => {
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedDetails, setUpdatedDetails] = useState(details);


    return (
        <li>
            <div className={'task-row-container ' + (isDone ? 'completed-task-row' : '')}>
                {isEditMode ? (
                    <>
                        <input
                            type="text"
                            value={updatedTitle}
                            onChange={event => setUpdatedTitle(event.target.value)}
                        />
                        <input
                            type="text"
                            value={updatedDetails}
                            onChange={event => setUpdatedDetails(event.target.value)}
                        />
                    </>
                ) : (
                    <>
                        <h3 className="task-row-title">{title}</h3>
                        <span>{details}</span>
                    </>
                )}
                <button onClick={setIsDone} className="timer-button">Done</button>
                <button onClick={() => {
                    if (isEditMode) {
                        updateTask(updatedTitle, updatedDetails);
                    }
                    else {
                        toggleEditMode();
                    }
                }} className="timer-button">

                    {isEditMode ? "Finish" : "Edit"}
                </button>
                <button onClick={deleteTask} className="timer-button">Delete</button>
            </div>
        </li>
    );
});

export const TodoList = ({ todoListActions, todoListState }: TodoListProps) => {
    const [newTitle, setNewTitle] = useState('');
    const [newDetails, setNewDetails] = useState('');

    return (
        <div className="todo-list-container">
            <ul>
                {todoListState.listOfTasks.map(task => (
                    <SingleTask
                        key={task.id}
                        title={task.title}
                        details={task.details}
                        isDone={task.isDone}
                        setIsDone={() => todoListActions.updateTask({ ...task, isDone: !task.isDone })}
                        isEditMode={task.isEditMode}
                        toggleEditMode={() => todoListActions.updateTask({ ...task, isEditMode: !task.isEditMode })}
                        updateTask={(title, details) => todoListActions.updateTask({ ...task, details, title,  isEditMode: !task.isEditMode  })}
                        deleteTask={() => todoListActions.deleteTask(task.id)}
                    />
                ))}
            </ul>
            <input
                type="text"
                value={newTitle}
                onChange={event => setNewTitle(event.target.value)}
            />
            <input
                type="text"
                value={newDetails}
                onChange={event => setNewDetails(event.target.value)}
            />
            <button onClick={() => {
                todoListActions.addTask(newTitle, newDetails)
                setNewTitle('');
                setNewDetails('')}}>
                {'Add new task'}
            </button>
        </div>
    );
}
