import {useEffect, useState} from "react";

enum TimerType  {
    ShortBreak = 'Short Break',
    LongBreak = 'Long Break',
    FocusWork = 'Focus Work',
}

const defaultTimerConfiguration = new Map<TimerType, number>(
    [
        // The values are in seconds.
        [TimerType.ShortBreak , 2],
        [TimerType.LongBreak , 10],
        [TimerType.FocusWork , 5]
    ]
)

export type PomodoroStateProps = {
    timerConfiguration?: Map<TimerType, number>;
    workPeriodsBeforeLongBreak?: number;
}

export type PomodoroActions = {
    startTimer: () => void;
    stopTimer: () => void;
    resetTimer: () => void;
}

export type PomodoroState = {
    currentTime: number;
    numberOfWorkPeriods: number;
    isPaused: boolean;
    currentTimer: TimerType
}

const initialState: PomodoroState = {
    currentTime : 0,
    numberOfWorkPeriods: 0,
    isPaused : true,
    currentTimer :  TimerType.FocusWork
}

const rotateTimerType = (type: TimerType): TimerType => {
    switch (type) {
        case TimerType.ShortBreak:
        case TimerType.LongBreak:
            return TimerType.FocusWork;
        case TimerType.FocusWork:
            return TimerType.ShortBreak;
        default:
            throw new Error(`Unknown TimerType: ${type}`);
    }
}

export const usePomodoroState = ({
    workPeriodsBeforeLongBreak = 4,
    timerConfiguration = defaultTimerConfiguration
                              }: PomodoroStateProps) : [PomodoroState,PomodoroActions] => {
    const [pomodoroState, setPomodoroState] = useState(initialState);

    const updateTimerState = () => {
        const threshold = timerConfiguration.get(pomodoroState.currentTimer);
        if (!threshold) {
            throw new Error(`Current timer type not found! Type: ${pomodoroState.currentTimer}`)
        }
        if (pomodoroState.currentTime >= threshold){
            if (pomodoroState.numberOfWorkPeriods >= workPeriodsBeforeLongBreak) {
                setPomodoroState({...pomodoroState,
                    currentTimer: TimerType.LongBreak,
                    numberOfWorkPeriods: 0, currentTime: 0})
            }
            else {
                setPomodoroState({
                    ...pomodoroState,
                    currentTimer: rotateTimerType(pomodoroState.currentTimer),
                    numberOfWorkPeriods: pomodoroState.currentTimer === TimerType.FocusWork
                        ? pomodoroState.numberOfWorkPeriods + 1
                        : pomodoroState.numberOfWorkPeriods,
                    currentTime: 0,
                });
            }
        }
        else {
            setPomodoroState({...pomodoroState, currentTime: pomodoroState.currentTime + 1})
        }
    }

    useEffect(() => {
        if (pomodoroState.isPaused) return;
        const interval = setInterval(updateTimerState,1000)
        return () => clearInterval(interval);
    }, [pomodoroState.isPaused, pomodoroState.currentTime])

    return [{...pomodoroState},{
        startTimer: () => { setPomodoroState({...pomodoroState, isPaused: false})},
        stopTimer: () => setPomodoroState({...pomodoroState, isPaused: true}),
        resetTimer: () => setPomodoroState({...pomodoroState, currentTime: 0}),}]
}

