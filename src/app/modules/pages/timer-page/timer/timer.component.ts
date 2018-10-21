import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Puzzle } from '../../../../models/puzzle/puzzle.model';
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

  get model(): Readonly<{ duration: string }> {
    return this._model;
  }

  get timer$(): Observable<TimerState> {
    return this.timerService.timer$();
  }

  get puzzle$(): Observable<Puzzle> {
    return this.puzzleService.puzzle$();
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
    this._subscription = this.timer$.subscribe(state => this.onStateChange(state));
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
    this._manualSubscription.unsubscribe();
    clearInterval(this._interval);
  }

  private async onStateChange(state: TimerState) {
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
        this._model = {duration: formatDuration(DateTimeUtils.durationInMillis(state.whenStarted, state.whenStopped))};

        clearInterval(this._interval);

        this.snackBar.open(
          `Stopped at ${this._model.duration}`,
          'Dismiss',
          {
            duration: 3000
          });

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

  public async onStart() {
    this._whenStarted = new Date();

    combineLatest(
      this.userService.user$(),
      this.puzzle$)
      .pipe(take(1))
      .subscribe(([state, puzzle]) => {
        if (state.user && this._whenStarted !== undefined) {
          this.timerService.start(state.user.uid, puzzle.name, this._whenStarted);
        }
      });
  }

  public async onStop() {
    this._whenStopped = new Date();
    if (this._whenStarted) {
      this._model = {duration: formatDuration(this._whenStopped.getTime() - this._whenStarted.getTime())};
    }

    this.timerService.stop(this._whenStopped);
  }

  public async onManual() {
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
        if (userState.user) {
          this.timerService.manual(userState.user.uid, puzzle.name, new Date());
        }
      });
  }

  public async onBlur() {
    if (this._model.duration === formatDuration(0)) {
      this.onClear();
    }
  }

  public async onSave() {
    if (this.duration !== null) {
      this._model = {duration: this.duration.value};
    }

    combineLatest(this.userService.user$(), this.puzzleService.puzzle$())
      .pipe(take(1))
      .subscribe(([state, puzzle]) => {
        if (state.user) {
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

  public async onClear() {
    this.timerService.clear();
  }
}
