import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Puzzle, PuzzleListState, PuzzleService } from '../../../services/puzzle.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-puzzles-page',
  templateUrl: './puzzles-page.component.html',
  styleUrls: ['./puzzles-page.component.css']
})
export class PuzzlesPageComponent implements OnInit {
  private _puzzles$: Observable<PuzzleListState>;
  private _user: firebase.User;

  get puzzles$(): Observable<PuzzleListState> {
    return this._puzzles$;
  }

  constructor(
    private puzzleService: PuzzleService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.userService.authState()
      .pipe(take(1))
      .subscribe((user: firebase.User) => {
        this._user = user;
        this._puzzles$ = this.puzzleService.puzzles();
        this.puzzleService.retrievePuzzles(user.uid);
      });
  }

  public onDelete(puzzle: Puzzle): void {
    this.puzzleService
      .delete(this._user.uid, puzzle)
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
