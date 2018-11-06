import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Puzzle } from '../../../../models/puzzle/puzzle.model';
import { States, TimerState } from '../../../../models/timer/timer.reducer';
import { PuzzleService } from '../../../../services/puzzle.service';
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
  private _model: Readonly<{ duration: string }> = {
    duration: formatDuration(0)
  };

  private _subscription: Subscription = Subscription.EMPTY;
  private _manualSubscription: Subscription = Subscription.EMPTY;

  private _interval: number;
  private _whenStarted: Date | undefined;
  private _whenStopped: Date | undefined;

  public States = States;

  public formGroup = new FormGroup({
    'duration': new FormControl(formatDuration(0), [
      Validators.pattern(/\d+:\d\d?(\.\d\d?\d?)/),
      Validators.required
    ])
  });
  private _puzzle: Puzzle | undefined;

  get model(): Readonly<{ duration: string }> {
    return this._model;
  }

  get timer$(): Observable<TimerState> {
    return this.timerService.timer$();
  }

  get puzzle$(): Observable<Puzzle | undefined> {
    return this.puzzleService.puzzle$();
  }

  get duration(): AbstractControl | null {
    return this.formGroup.get('duration');
  }

  constructor(
    private readonly userService: UserService,
    private readonly puzzleService: PuzzleService,
    private readonly timerService: TimerService,
    private readonly snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this._subscription = this.timer$.subscribe(state => this.onStateChange(state));
    this._subscription.add(this.puzzleService.puzzle$()
      .pipe(filter(puzzle => puzzle !== undefined))
      .subscribe((puzzle: Puzzle) => {
        if (this._puzzle !== undefined && this._puzzle.name !== puzzle.name) {
          clearInterval(this._interval);

          this.timerService.clear();
        }
        this._puzzle = puzzle;
      }));
  }

  ngOnDestroy() {
    clearInterval(this._interval);

    this._subscription.unsubscribe();
    this._manualSubscription.unsubscribe();
    this.timer$
      .pipe(
        take(1),
        filter(timer => timer.state === States.STOPPED)
      )
      .subscribe(() => this.timerService.clear());
  }

  private onStateChange(state: TimerState) {
    this._manualSubscription.unsubscribe();

    switch (state.state) {
      case States.INITIAL: {
        this._model = {duration: formatDuration(0)};
        if (this.duration !== null) {
          this.duration.reset(formatDuration(0));
        }
        this._whenStarted = undefined;
        this._whenStopped = undefined;
        break;
      }
      case States.STARTED: {
        this._whenStarted = state.whenStarted;
        this._model = {duration: formatDuration(DateTimeUtils.durationInMillis(state.whenStarted, new Date()))};

        clearInterval(this._interval);
        this._interval = window.setInterval(
          () => this._model = {duration: formatDuration(DateTimeUtils.durationInMillis(state.whenStarted, new Date()))},
          31
        );

        break;
      }
      case States.STOPPED: {
        this._whenStarted = state.whenStarted;
        this._whenStopped = state.whenStopped;
        this._model = {duration: formatDuration(DateTimeUtils.durationInMillis(state.whenStarted, state.whenStopped))};

        clearInterval(this._interval);

        break;
      }
      case States.MANUAL: {
        this._model = {duration: formatDuration(state.duration)};
        this._whenStarted = state.whenStarted;
        this._whenStopped = state.whenStopped;

        if (this.duration !== null) {
          this._manualSubscription = this.duration.valueChanges
            .subscribe((value: string) => this._model = {duration: value});
        }

        break;
      }
    }
  }

  public onStart() {
    this._whenStarted = new Date();

    combineLatest(
      this.userService.user$(),
      this.puzzle$)
      .pipe(take(1))
      .subscribe(([state, puzzle]) => {
        if (state.user && this._whenStarted !== undefined && puzzle !== undefined) {
          this._puzzle = puzzle;
          this.timerService.start(state.user.uid, puzzle.name, this._whenStarted);

          this.notifyUser('Timer started');
        }
      });
  }

  public onStop() {
    this._whenStopped = new Date();
    if (this._whenStarted) {
      this._model = {duration: formatDuration(this._whenStopped.getTime() - this._whenStarted.getTime())};
    }

    this.timerService.stop(this._whenStopped);

    this.notifyUser(`Stopped at ${this._model.duration}`);
  }

  public onManual() {
    combineLatest(
      this.userService.user$(),
      this.timerService.timer$(),
      this.puzzle$)
      .pipe(
        take(1),
        filter(([, state]) => {
          switch (state.state) {
            case States.STARTED:
            case States.STOPPED:
              return false;
            default:
              return true;
          }
        })
      )
      .subscribe(([userState, , puzzle]) => {
        if (userState.user && puzzle !== undefined) {
          this.timerService.manual(userState.user.uid, puzzle.name, new Date());
        }
      });
  }

  public onBlur() {
    if (this._model.duration === formatDuration(0)) {
      this.onClear();
    }
  }

  public onSave() {
    if (this.duration !== null) {
      this._model = {duration: this.duration.value};
    }

    combineLatest(this.userService.user$(), this.puzzleService.puzzle$())
      .pipe(take(1))
      .subscribe(([state, puzzle]) => {
        if (state.user && puzzle !== undefined) {
          this.timerService.add({
            value: parseDuration(this._model.duration),
            uid: state.user.uid,
            timestamp: new Date().getTime(),
            puzzle: puzzle.name
          })
            .then(() => {
              this.snackBar.open(
                `Saved ${this._model.duration}`,
                'Dismiss',
                {
                  duration: 3000
                });
            });
        }
      });
  }

  public onClear() {
    this.timerService.clear();
  }

  private notifyUser(message: string) {
    this.snackBar.open(
      message,
      'Dismiss',
      {
        duration: 1000
      });
  }
}
