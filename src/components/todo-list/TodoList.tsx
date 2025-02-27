import React, { useState } from "react";
import { Task, TodoListActions, TodoListState } from "./use-todo-list-state";

export type TodoListProps = {
    todoListState: TodoListState,
    todoListActions: TodoListActions
}

export type SingleTaskProps = Omit<Task, 'id'> & {
    setIsDone: () => void;
    setEditMode: () => void;
    updateTask: (title: string, details: string) => void;
}

export const SingleTask = React.memo(({
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
        <li>
            <div className={'task-row-container ' + isDone ? 'completed-task-row' : ''}>
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
                    setEditMode();
                    if (isEditMode) {
                        updateTask(updatedTitle, updatedDetails);
                    }
                }} className="timer-button">
                    {isEditMode ? "Finish" : "Edit"}
                </button>
            </div>
        </li>
    );
});

export const TodoList = ({ todoListActions, todoListState }: TodoListProps) => {
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
                        setEditMode={() => todoListActions.updateTask({ ...task, isEditMode: !task.isEditMode })}
                        updateTask={(title, details) => todoListActions.updateTask({ ...task, details, title })}
                    />
                ))}
            </ul>
        </div>
    );
}
