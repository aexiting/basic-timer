import React from "react"
import {PomodoroActions, PomodoroState} from "./use-pomodoro-state";


export type PomodoroProps = {
    state: PomodoroState;
    actions: PomodoroActions;
}

export const Pomodoro = (props: PomodoroProps) => {
   return (
        <div className="timer">
            <h1>
                i love Char, she is so fine
            </h1>
            <h2>
                By Me lmao
            </h2>
            <h2>{props.state.currentTimer}</h2>
            <h2>{props.state.currentTime}</h2>
            <button id="startButton" onClick={() => props.actions.startTimer()}>Start</button>
            <button id="stopButton"  onClick={() => props.actions.stopTimer()}>Stop</button>
            <button id="startReset" onClick={() => props.actions.resetTimer()}>Reset</button>
        </div>
    )
}