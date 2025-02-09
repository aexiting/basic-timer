import React from "react";
import { PomodoroActions, PomodoroState } from "./use-pomodoro-state";
import './Pomodoro.css'; // Import your CSS file

export type PomodoroProps = {
    state: PomodoroState;
    actions: PomodoroActions;
};

const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export const Pomodoro = (props: PomodoroProps) => {
    const { state, actions } = props; // Destructure props for cleaner code

    return (
        <div className="pomodoro-container"> {/* Added a class for styling */}
            <h1 className="pomodoro-title">Pomodoro Timer</h1>
            <div className="timer-display">
                <h2 className="timer-type" aria-label={`Current timer type: ${state.currentTimer}`}>
                    {state.currentTimer}
                </h2>
                <div className="time-left" aria-live="polite"> {/* aria-live for screen readers */}
                    {formatTime(state.currentTime)}
                </div>
            </div>
            <div className="timer-controls">
                <button onClick={() => (state.isPaused ? actions.startTimer() : actions.stopTimer())} className="timer-button">
                    {state.isPaused ? "Start" : "Pause"}  {/* More semantically correct button text */}
                </button>
                <button onClick={() => actions.resetTimer()} className="timer-button">
                    Reset
                </button>
            </div>
        </div>
    );
};