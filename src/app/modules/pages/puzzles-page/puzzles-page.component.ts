import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Puzzle, PuzzleService } from '../../../services/puzzle.service';
import { UserService, UserState } from '../../../services/user.service';

@Component({
  selector: 'app-puzzles-page',
  templateUrl: './puzzles-page.component.html',
  styleUrls: ['./puzzles-page.component.css']
})
export class PuzzlesPageComponent implements OnInit {
  private _puzzles$: Observable<Puzzle[]>;
  private _user: firebase.User;

  get puzzles$(): Observable<Puzzle[]> {
    return this._puzzles$;
  }

  constructor(
    private userService: UserService,
    private puzzleService: PuzzleService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.userService.user$().subscribe((state: UserState) => this._user = state.user);
    this._puzzles$ = this.puzzleService.puzzles$();
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
