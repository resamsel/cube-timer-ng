import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { AppState } from "../shared/app.state";
import { reducer, States, TimerState } from "../models/timer/timer.reducer";
import { ClearTimer, ManualTimer, StartTimer, StopTimer } from "../models/timer/timer.actions";
import { filter } from "rxjs/operators";
import { ScoreService } from "./score.service";

@Injectable({providedIn: 'root'})
export class TimerService {

  public static reducer = reducer;

  constructor(
    private readonly scoreService: ScoreService,
    private readonly store: Store<AppState>
  ) {
    store.pipe(
      select(state => state.timer),
      filter(state => state.state == States.STOPPED))
      .subscribe(state => {
        scoreService.create({
          uid: state.uid,
          timestamp: state.whenStarted.getTime(),
          value: state.duration,
          puzzle: state.puzzle
        })
      });
  }

  public state$(): Observable<TimerState> {
    return this.store.pipe(select(state => state.timer));
  }

  public start(uid: string, puzzle: string, whenStarted: Date): void {
    this.store.dispatch(new StartTimer(uid, puzzle, whenStarted));
  }

  public stop(whenStopped: Date): void {
    this.store.dispatch(new StopTimer(whenStopped));
  }

  public manual(uid: string, puzzle: string, whenStarted: Date): void {
    this.store.dispatch(new ManualTimer(uid, puzzle, whenStarted));
  }

  public clear(): void {
    this.store.dispatch(new ClearTimer());
  }
}
