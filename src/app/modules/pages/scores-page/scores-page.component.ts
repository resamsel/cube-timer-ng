import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Puzzle } from '../../../models/puzzle/puzzle.model';
import { Score } from '../../../models/score/score.model';
import { PuzzleService } from '../../../services/puzzle.service';
import { ScoreService } from '../../../services/score.service';

@Component({
  selector: 'app-scores-page',
  templateUrl: './scores-page.component.html',
  styleUrls: ['./scores-page.component.css']
})
export class ScoresPageComponent {
  get loading$(): Observable<boolean> {
    return this.scoreService.loading$();
  }

  get puzzle$(): Observable<Puzzle> {
    return this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.puzzleService.from(params)),
      filter((puzzle: Puzzle) => puzzle !== undefined)
    );
  }

  get puzzles$(): Observable<Puzzle[]> {
    return this.puzzleService.puzzles$();
  }

  get scores$(): Observable<Score[]> {
    return this.scoreService.scores$();
  }

  constructor(
    private readonly scoreService: ScoreService,
    private readonly puzzleService: PuzzleService,
    private readonly route: ActivatedRoute
  ) {
  }
}
