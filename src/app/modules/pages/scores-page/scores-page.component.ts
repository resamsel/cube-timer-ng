import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { Puzzle, PuzzleService } from '../../../services/puzzle.service';
import { Score, ScoreService } from '../../../services/score.service';
import { SettingsService } from '../../../services/settings.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-scores-page',
  templateUrl: './scores-page.component.html',
  styleUrls: ['./scores-page.component.css']
})
export class ScoresPageComponent implements OnInit {
  private _puzzles$: Observable<Puzzle[]>;
  private _scores$: Observable<Score[]>;
  private _user: User;

  get puzzles$(): Observable<Puzzle[]> {
    return this._puzzles$;
  }

  get scores$(): Observable<Score[]> {
    return this._scores$;
  }

  constructor(
    private scoreService: ScoreService,
    private userService: UserService,
    private puzzleService: PuzzleService
  ) {
  }

  ngOnInit() {
    this._puzzles$ = this.puzzleService.puzzles$();
    this._scores$ = this.scoreService.scores$();
  }
}
