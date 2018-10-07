import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PuzzleService } from '../../../services/puzzle.service';
import { ScoreService } from '../../../services/score.service';
import { Score } from "../../../models/score/score.model";
import { Puzzle } from "../../../models/puzzle/puzzle.model";

@Component({
  selector: 'app-scores-page',
  templateUrl: './scores-page.component.html',
  styleUrls: ['./scores-page.component.css']
})
export class ScoresPageComponent implements OnInit {
  private _puzzles$: Observable<Puzzle[]>;
  private _scores$: Observable<Score[]>;

  get puzzles$(): Observable<Puzzle[]> {
    return this._puzzles$;
  }

  get scores$(): Observable<Score[]> {
    return this._scores$;
  }

  constructor(
    private scoreService: ScoreService,
    private puzzleService: PuzzleService
  ) {
  }

  ngOnInit() {
    this._puzzles$ = this.puzzleService.puzzles$();
    this._scores$ = this.scoreService.scores$();
  }
}
