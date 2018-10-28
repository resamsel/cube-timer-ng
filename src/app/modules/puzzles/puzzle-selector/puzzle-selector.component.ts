import { Component } from '@angular/core';
import { Puzzle } from '../../../models/puzzle/puzzle.model';
import { PuzzleService } from '../../../services/puzzle.service';
import { combineLatest, Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { PuzzleCreatorDialogComponent } from '../puzzle-creator/puzzle-creator-dialog.component';
import { UserService } from '../../../services/user.service';
import { take } from 'rxjs/operators';
import { TimerService } from '../../../services/timer.service';
import { States, TimerState } from '../../../models/timer/timer.reducer';

@Component({
  selector: 'app-puzzle-selector',
  templateUrl: './puzzle-selector.component.html',
  styleUrls: ['./puzzle-selector.component.scss']
})
export class PuzzleSelectorComponent {
  INITIAL: States = States.INITIAL;

  constructor(
    private readonly puzzleService: PuzzleService,
    private readonly userService: UserService,
    private readonly timerService: TimerService,
    private readonly dialog: MatDialog) {
  }

  get puzzle$(): Observable<Puzzle> {
    return this.puzzleService.puzzle$();
  }

  get puzzles$(): Observable<Puzzle[]> {
    return this.puzzleService.puzzles$();
  }

  get timer$(): Observable<TimerState> {
    return this.timerService.timer$();
  }

  onActivate(puzzle: Puzzle): void {
    this.puzzleService.activatePuzzle(puzzle.name);
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(PuzzleCreatorDialogComponent, {
      width: '250px',
      data: {}
    });

    combineLatest(
      dialogRef.afterClosed(),
      this.userService.user$())
      .pipe(take(1))
      .subscribe(([puzzle, state]) => {
        if (state.user && puzzle !== undefined) {
          this.puzzleService.create(state.user.uid, {name: puzzle})
            .then(() => this.puzzleService.activatePuzzle(puzzle));
        }
      });
  }
}
