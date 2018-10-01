import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Puzzle, PuzzleService } from '../../services/puzzle.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-puzzles-page',
  templateUrl: './puzzles-page.component.html',
  styleUrls: ['./puzzles-page.component.css']
})
export class PuzzlesPageComponent implements OnInit {
  private _puzzles$: Observable<Puzzle[]>;

  get puzzles$(): Observable<Puzzle[]> {
    return this._puzzles$;
  }

  constructor(
    private puzzleService: PuzzleService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.userService.authState()
      .pipe(take(1))
      .subscribe(user => {
        this._puzzles$ = this.puzzleService.puzzles();
      });
  }
}
