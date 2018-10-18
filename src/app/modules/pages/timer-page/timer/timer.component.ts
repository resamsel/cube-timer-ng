import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { States, TimerState } from '../../../../models/timer/timer.reducer';
import { PuzzleService } from '../../../../services/puzzle.service';
import { ScoreService } from '../../../../services/score.service';
import { TimerService } from '../../../../services/timer.service';
import { UserService } from '../../../../services/user.service';
import { DateTimeUtils } from '../../../../shared/date-time-utils';

export function formatDuration(duration: number): string {
  return moment(duration).format('mm:ss.SS');
}

export function parseDuration(duration: string): number {
  return moment(duration, 'mm:ss.SS').valueOf();
}


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  private _activePuzzle$: Observable<string>;
  private _state$: Observable<TimerState>;

  private _model: { duration: number } = {
    duration: 0
  };

  private _subscription: Subscription = Subscription.EMPTY;
  private _interval: number;
  private _whenStarted: Date | undefined;
  private _whenStopped: Date | undefined;

  public States = States;

  public formGroup = new FormGroup({
    'duration': new FormControl(formatDuration(0), [
      Validators.pattern(/\d+:\d\d?(\.\d\d?\d?)/)
    ])
  });

  get activePuzzle$(): Observable<string> {
    return this._activePuzzle$;
  }

  get state$(): Observable<TimerState> {
    return this._state$;
  }

  get duration(): AbstractControl | null {
    return this.formGroup.get('duration');
  }

  constructor(
    private readonly userService: UserService,
    private readonly puzzleService: PuzzleService,
    private readonly scoreService: ScoreService,
    private readonly timerService: TimerService,
    private readonly snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this._activePuzzle$ = this.puzzleService.puzzle$();
    this._state$ = this.timerService.state$();
    this._subscription = this._state$.subscribe(state => this.onStateChange(state));

    if (this.duration !== null) {
      this._subscription.add(
        this.duration.valueChanges
          .subscribe((value: string) => this._model.duration = parseDuration(value))
      );
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
    clearInterval(this._interval);
  }

  private async onStateChange(state: TimerState) {
    switch (state.state) {
      case States.INITIAL: {
        this._model.duration = 0;
        if (this.duration !== null) {
          this.duration.reset(formatDuration(0));
        }
        this._whenStarted = undefined;
        this._whenStopped = undefined;
        break;
      }
      case States.STARTED: {
        this._whenStarted = state.whenStarted;
        this._model.duration = DateTimeUtils.durationInMillis(state.whenStarted, new Date());

        clearInterval(this._interval);
        this._interval = window.setInterval(
          () => this._model.duration = DateTimeUtils.durationInMillis(state.whenStarted, new Date()),
          31
        );

        this.snackBar.open(
          `Timer started`,
          'Dismiss',
          {
            duration: 1000
          });

        break;
      }
      case States.STOPPED: {
        this._whenStarted = state.whenStarted;
        this._whenStopped = state.whenStopped;
        this._model.duration = DateTimeUtils.durationInMillis(state.whenStarted, state.whenStopped);

        clearInterval(this._interval);

        this.snackBar.open(
          `Stopped at ${formatDuration(this._model.duration)}`,
          'Dismiss',
          {
            duration: 3000
          });

        break;
      }
      case States.MANUAL: {
        this._model.duration = state.duration;
        this._whenStarted = state.whenStarted;
        this._whenStopped = state.whenStopped;
        break;
      }
    }
  }

  public async onStart() {
    this._whenStarted = new Date();
    combineLatest(this.userService.user$(), this.puzzleService.puzzle$())
      .pipe(take(1))
      .subscribe(([state, puzzle]) => {
        if (state.user !== null && this._whenStarted !== undefined) {
          this.timerService.start(state.user.uid, puzzle, this._whenStarted);
        }
      });
  }

  public async onStop() {
    this._whenStopped = new Date();
    if (this._whenStarted) {
      this._model.duration = this._whenStopped.getTime() - this._whenStarted.getTime();
    }

    this.timerService.stop(this._whenStopped);
  }

  public async onManual() {
    combineLatest(
      this.userService.user$(),
      this.puzzleService.puzzle$(),
      this.timerService.state$())
      .pipe(
        take(1),
        filter(([userState, puzzle, state]) => {
          switch (state.state) {
            case States.STARTED:
            case States.STOPPED:
              return false;
            default:
              return true;
          }
        })
      )
      .subscribe(([userState, puzzle]) => {
        if (userState.user !== null) {
          this.timerService.manual(userState.user.uid, puzzle, new Date());
        }
      });
  }

  public async onBlur() {
    if (this._model.duration === 0) {
      this.onClear();
    }
  }

  public async onSave() {
    if (this.duration !== null) {
      this._model.duration = parseDuration(this.duration.value);
    }

    combineLatest(this.userService.user$(), this.puzzleService.puzzle$())
      .pipe(take(1))
      .subscribe(([state, puzzle]) => {
        if (state.user !== null) {
          this.timerService.add({
            value: this._model.duration,
            uid: state.user.uid,
            timestamp: new Date().getTime(),
            puzzle: puzzle
          })
            .then(() => {
              this.snackBar.open(
                `Saved ${formatDuration(this._model.duration)}`,
                'Dismiss',
                {
                  duration: 3000
                });
            });
        }
      });
  }

  public async onClear() {
    this.timerService.clear();
  }
}
