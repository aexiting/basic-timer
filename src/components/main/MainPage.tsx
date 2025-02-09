import React from "react";
import {Pomodoro, PomodoroProps} from "../pomodoro/Pomodoro";
import {usePomodoroState} from "../pomodoro/use-pomodoro-state";


export const MainPage = () => {
    const [pomodoroState, pomodoroActions] = usePomodoroState({});
    return (
        <Pomodoro state={pomodoroState} actions={pomodoroActions}/>
    )
}