import React from "react";
import {Pomodoro, PomodoroProps} from "../pomodoro/Pomodoro";
import {usePomodoroState} from "../pomodoro/use-pomodoro-state";
import {useTodoListState} from "../todo-list/use-todo-list-state";
import {TodoList} from "../todo-list/TodoList";


export const MainPage = () => {
  //  const [pomodoroState, pomodoroActions] = usePomodoroState({});
  //  return (
  //      <Pomodoro state={pomodoroState} actions={pomodoroActions}/>
  //  )
    const [todoListState, todoListActions] = useTodoListState({maxTasks: 10});
    return <TodoList todoListState={todoListState} todoListActions={todoListActions}/>
}