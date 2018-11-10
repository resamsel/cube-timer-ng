import { Component } from '@angular/core';
import { Puzzle } from '../../../models/puzzle/puzzle.model';
import { PuzzleService } from '../../../services/puzzle.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { PuzzleCreatorDialogComponent } from '../puzzle-creator/puzzle-creator-dialog.component';
import { UserService } from '../../../services/user.service';
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

  get puzzle$(): Observable<Puzzle | undefined> {
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
    PuzzleCreatorDialogComponent.openDialog(this.dialog, this.userService, this.puzzleService);
  }
}
