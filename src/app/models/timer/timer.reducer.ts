import { TimerActions, TimerActionTypes } from './timer.actions';
import { durationInMillis } from '../../shared/date-time-utils';

export enum States {
  INITIAL = 'Initial',
  STARTED = 'Started',
  STOPPED = 'Stopped',
  MANUAL = 'Manual',
}

export interface TimerState {
  state: States;
  uid?: string;
  puzzle?: string;
  whenStarted?: Date;
  whenStopped?: Date;
  duration: number;
}

export const initialTimerState: TimerState = {
  state: States.INITIAL,
  duration: 0
};

export function reducer(state = initialTimerState, action: TimerActions): TimerState {
  switch (action.type) {
    case TimerActionTypes.StartTimer:
      return {
        ...state,
        state: States.STARTED,
        uid: action.uid,
        puzzle: action.puzzle,
        whenStarted: action.whenStarted,
        duration: 0
      };

    case TimerActionTypes.StopTimer:
      return {
        ...state,
        state: States.STOPPED,
        whenStopped: action.whenStopped,
        duration: durationInMillis(state.whenStarted, action.whenStopped)
      };

    case TimerActionTypes.ManualTimer:
      return {
        ...state,
        state: States.MANUAL,
        uid: action.uid,
        puzzle: action.puzzle,
        whenStarted: action.whenStarted
      };

    case TimerActionTypes.SaveTimer:
      return {
        ...state,
        state: States.STOPPED,
        duration: action.duration
      };

    case TimerActionTypes.ClearTimer:
      return {
        ...state,
        ...initialTimerState
      };

    default:
      return state;
  }
}
