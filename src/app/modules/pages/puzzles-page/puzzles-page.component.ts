import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Puzzle } from '../../../models/puzzle/puzzle.model';
import { PuzzleService } from '../../../services/puzzle.service';
import { ScoreService } from '../../../services/score.service';
import { UserService } from '../../../services/user.service';
import { UserState } from '../../../models/user/user.reducer';
import { encode } from 'firebase-key';
import { PuzzleCreatorDialogComponent } from '../../puzzles/puzzle-creator/puzzle-creator-dialog.component';

function timerLink(puzzle: Puzzle): string[] {
  return ['/', 'puzzles', encode(puzzle.name)];
}

@Component({
  selector: 'app-puzzles-page',
  templateUrl: './puzzles-page.component.html',
  styleUrls: ['./puzzles-page.component.scss']
})
export class PuzzlesPageComponent {
  public timerLink = timerLink;

  get puzzle$(): Observable<Puzzle | undefined> {
    return this.puzzleService.puzzle$();
  }

  get puzzles$(): Observable<Puzzle[]> {
    return this.puzzleService.puzzles$();
  }

  get scoreCount$(): Observable<number> {
    return this.scoreService.count$();
  }

  constructor(
    private readonly userService: UserService,
    private readonly puzzleService: PuzzleService,
    private readonly scoreService: ScoreService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {
  }

  onCreate(): void {
    PuzzleCreatorDialogComponent.openDialog(this.dialog, this.userService, this.puzzleService);
  }

  public onDelete(puzzle: Puzzle, event: Event): boolean {
    this.userService.user$()
      .pipe(take(1))
      .subscribe((userState: UserState) => {
        if (userState.user) {
          const timer = this.puzzleService
            .delayDelete(userState.user.uid, puzzle, 20000);
          this.onDeleted(puzzle, timer);
        }
      });

    event.stopPropagation();
    event.preventDefault();
    return false;
  }

  private async onDeleted(puzzle: Puzzle, timer: number) {
    this.snackBar.open(
      `Puzzle ${puzzle.name} has been deleted`,
      'Undo',
      {duration: 8000}
    )
      .onAction()
      .subscribe(() => {
        this.puzzleService.undoDelete(puzzle, timer);

        this.snackBar.open(
          `Puzzle ${puzzle.name} has been restored`,
          'Dismiss',
          {duration: 3000}
        );
      });
  }
}
