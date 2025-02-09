import {useEffect, useState} from "react";

export enum TimerType  {
    ShortBreak = 'Short Break',
    LongBreak = 'Long Break',
    FocusWork = 'Focus Work',
}

const defaultTimerConfiguration = new Map<TimerType, number>(
    [
        // The values are in seconds.
        [TimerType.ShortBreak , 5 * 60 ],
        [TimerType.LongBreak , 30 * 60 ],
        [TimerType.FocusWork , 25 * 60 ]
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
    currentTime : defaultTimerConfiguration.get(TimerType.FocusWork) ?? 0,
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

        setPomodoroState(prevState => {

            if (prevState.currentTime <= 0){
                if (prevState.numberOfWorkPeriods >= workPeriodsBeforeLongBreak) {
                    return{...prevState,
                        currentTimer: TimerType.LongBreak,
                        numberOfWorkPeriods: 0, currentTime: timerConfiguration.get(TimerType.LongBreak) ?? 0}
                }
                else {
                    const nextTimer = rotateTimerType(prevState.currentTimer);
                    return{
                        ...prevState,
                        currentTimer: nextTimer,
                        numberOfWorkPeriods: prevState.currentTimer === TimerType.FocusWork
                            ? prevState.numberOfWorkPeriods + 1
                            : prevState.numberOfWorkPeriods,
                        currentTime:   timerConfiguration.get(nextTimer) ?? 0,
                    };
                }
            }
            else {
                return{...prevState, currentTime: prevState.currentTime - 1}
            }
        })
    }

    useEffect(() => {
        if (pomodoroState.isPaused) return;
        const interval = setInterval(updateTimerState,1000)
        return () => clearInterval(interval);
    }, [pomodoroState.isPaused, pomodoroState.currentTime])

    return [{...pomodoroState},{
        startTimer: () => { setPomodoroState(prevState => {
            return {...prevState, isPaused: false}
        })},
        stopTimer: () => setPomodoroState(prevState => {
            return {...prevState, isPaused: true}
        }),
        resetTimer: () => setPomodoroState(prevState => {
            return {...prevState, isPaused: true, currentTime: timerConfiguration.get(prevState.currentTimer) ?? 0}
        })}]
}