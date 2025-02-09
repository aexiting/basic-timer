import React from "react"
import {PomodoroActions, PomodoroState} from "./use-pomodoro-state";


export type PomodoroProps = {
    state: PomodoroState;
    actions: PomodoroActions;
}

const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const Pomodoro = (props: PomodoroProps) => {
   return (
        <div className="timer">
            <h1>
                Pomodoro
            </h1>

            <h2>{props.state.currentTimer}</h2>
            <h2>{formatTime(props.state.currentTime)}</h2>
            <button id="startButton" onClick={() => props.actions.startTimer()}>Start</button>
            <button id="stopButton"  onClick={() => props.actions.stopTimer()}>Stop</button>
            <button id="startReset" onClick={() => props.actions.resetTimer()}>Reset</button>
        </div>
    )
}