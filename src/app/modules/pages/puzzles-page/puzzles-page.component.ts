import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Puzzle, PuzzleListState, PuzzleService } from '../../../services/puzzle.service';
import { UserService } from '../../../services/user.service';
import { AppState } from '../../../shared/app.state';

@Component({
  selector: 'app-puzzles-page',
  templateUrl: './puzzles-page.component.html',
  styleUrls: ['./puzzles-page.component.css']
})
export class PuzzlesPageComponent implements OnInit {
  private _puzzles$: Observable<PuzzleListState>;

  get puzzles$(): Observable<PuzzleListState> {
    return this._puzzles$;
  }

  constructor(
    private puzzleService: PuzzleService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.userService.authState()
      .pipe(take(1))
      .subscribe(() => {
        this._puzzles$ = this.store.pipe(select('puzzles'));
        this.puzzleService.puzzles();
      });
  }

  public onDelete(puzzle: Puzzle): void {
    this.puzzleService
      .delete(puzzle)
      .then(() => this.onDeleted(puzzle));
  }

  private onDeleted(puzzle: Puzzle): void {
    this.snackBar.open(
      `Puzzle ${puzzle.name} has been deleted`,
      'Dismiss',
      {duration: 3000}
    );
  }
}
