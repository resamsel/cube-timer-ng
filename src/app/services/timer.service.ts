import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Score } from '../models/score/score.model';
import { ClearTimer, ManualTimer, StartTimer, StopTimer } from '../models/timer/timer.actions';
import { reducer, States, TimerState } from '../models/timer/timer.reducer';
import { AppState } from '../shared/app.state';
import { ScoreService } from './score.service';

@Injectable({providedIn: 'root'})
export class TimerService {
  public static reducer = reducer;

  constructor(
    private readonly scoreService: ScoreService,
    private readonly store: Store<AppState>
  ) {
    store.pipe(
      select(state => state.timer),
      filter(state => state.state === States.STOPPED))
      .subscribe((state: TimerState) => {
        if (state.uid !== undefined && state.puzzle !== undefined && state.whenStarted !== undefined) {
          scoreService.create({
            uid: state.uid,
            timestamp: state.whenStarted.getTime(),
            value: state.duration,
            puzzle: state.puzzle
          });
        }
      });
  }

  public timer$(): Observable<TimerState> {
    return this.store.pipe(select(state => state.timer));
  }

  public async add(score: Score) {
    this.scoreService.create(score);
  }

  public async start(uid: string, puzzle: string, whenStarted: Date) {
    this.store.dispatch(new StartTimer(uid, puzzle, whenStarted));
  }

  public async stop(whenStopped: Date) {
    this.store.dispatch(new StopTimer(whenStopped));
  }

  public async manual(uid: string, puzzle: string, whenStarted: Date) {
    this.store.dispatch(new ManualTimer(uid, puzzle, whenStarted));
  }

  public clear(): void {
    this.store.dispatch(new ClearTimer());
  }
}
