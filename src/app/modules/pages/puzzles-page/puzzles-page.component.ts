import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Puzzle } from '../../../models/puzzle/puzzle.model';
import { PuzzleService } from '../../../services/puzzle.service';
import { ScoreService } from '../../../services/score.service';
import { UserService, UserState } from '../../../services/user.service';

@Component({
  selector: 'app-puzzles-page',
  templateUrl: './puzzles-page.component.html',
  styleUrls: ['./puzzles-page.component.scss']
})
export class PuzzlesPageComponent implements OnInit {
  private _puzzle$: Observable<Puzzle>;
  private _puzzles$: Observable<Puzzle[]>;

  get puzzle$(): Observable<Puzzle> {
    return this._puzzle$;
  }

  get puzzles$(): Observable<Puzzle[]> {
    return this._puzzles$;
  }

  get scoreCount$(): Observable<number> {
    return this.scoreService.count$();
  }

  constructor(
    private userService: UserService,
    private puzzleService: PuzzleService,
    private readonly scoreService: ScoreService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this._puzzle$ = this.puzzleService.puzzle$();
    this._puzzles$ = this.puzzleService.puzzles$();
  }

  public async onDelete(puzzle: Puzzle) {
    this.userService.user$()
      .pipe(take(1))
      .subscribe((userState: UserState) => {
        if (userState.user !== null) {
          this.puzzleService
            .delete(userState.user.uid, puzzle)
            .then(() => this.onDeleted(puzzle));
        }
      });
  }

  private onDeleted(puzzle: Puzzle): void {
    this.snackBar.open(
      `Puzzle ${puzzle.name} has been deleted`,
      'Dismiss',
      {duration: 3000}
    );
  }
}
