import { Component, OnInit } from '@angular/core';
import { PuzzleService } from "../../../../services/puzzle.service";
import { combineLatest, Observable } from "rxjs";
import { DatePipe } from "@angular/common";
import { Score, ScoreService } from "../../../../services/score.service";
import { UserService } from "../../../../services/user.service";
import { take } from "rxjs/operators";
import * as moment from "moment";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  private _activePuzzle$: Observable<string>;

  private _duration: number = 0;

  get duration(): string {
    return new DatePipe('en').transform(this._duration, 'mm:ss.SS');
  }

  set duration(duration: string) {
    this._duration = moment(duration, 'mm:ss.SS').valueOf();
  }

  get activePuzzle$(): Observable<string> {
    return this._activePuzzle$;
  }

  constructor(
    private readonly userService: UserService,
    private readonly puzzleService: PuzzleService,
    private readonly scoreService: ScoreService) {
  }

  ngOnInit() {
    this._activePuzzle$ = this.puzzleService.puzzle$();
  }

  public onSave() {
    combineLatest(this.userService.user$(), this.puzzleService.puzzle$())
      .pipe(take(1))
      .subscribe(([state, puzzle]) => {
        const score: Score = {
          value: this._duration,
          uid: state.user.uid,
          timestamp: new Date().getTime(),
          puzzle: puzzle
        }
        this.scoreService.create(score)
          .then(() => console.log('Score created'));
      });
  }
}
