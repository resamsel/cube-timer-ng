import { Action } from '@ngrx/store';

export enum TimerActionTypes {
  StartTimer = '[Timer] Start Timer',
  StopTimer = '[Timer] Stop Timer',
  ManualTimer = '[Timer] Manual Timer',
  SaveTimer = '[Timer] Save Timer',
  ClearTimer = '[Timer] Clear Timer'
}

export class StartTimer implements Action {
  readonly type = TimerActionTypes.StartTimer;

  constructor(
    public uid: string,
    public puzzle: string,
    public whenStarted: Date
  ) {
  }
}

export class StopTimer implements Action {
  readonly type = TimerActionTypes.StopTimer;

  constructor(public whenStopped: Date) {
  }
}

export class ManualTimer implements Action {
  readonly type = TimerActionTypes.ManualTimer;

  constructor(
    public uid: string,
    public puzzle: string,
    public whenStarted: Date
  ) {
  }
}

export class SaveTimer implements Action {
  readonly type = TimerActionTypes.SaveTimer;

  constructor(public duration: number) {
  }
}

export class ClearTimer implements Action {
  readonly type = TimerActionTypes.ClearTimer;
}

export type TimerActions =
  StartTimer
  | StopTimer
  | ManualTimer
  | SaveTimer
  | ClearTimer;
