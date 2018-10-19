import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Puzzle } from '../../../models/puzzle/puzzle.model';
import { Score } from '../../../models/score/score.model';
import { PuzzleService } from '../../../services/puzzle.service';
import { ScoreService } from '../../../services/score.service';

@Component({
  selector: 'app-scores-page',
  templateUrl: './scores-page.component.html',
  styleUrls: ['./scores-page.component.css']
})
export class ScoresPageComponent implements OnInit {
  private _puzzle$: Observable<Puzzle>;
  private _puzzles$: Observable<Puzzle[]>;
  private _scores$: Observable<Score[]>;
  private _loading$: Observable<boolean>;

  get loading$(): Observable<boolean> {
    return this._loading$;
  }

  get puzzle$(): Observable<Puzzle> {
    return this._puzzle$;
  }

  get puzzles$(): Observable<Puzzle[]> {
    return this._puzzles$;
  }

  get scores$(): Observable<Score[]> {
    return this._scores$;
  }

  constructor(
    private readonly scoreService: ScoreService,
    private readonly puzzleService: PuzzleService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.puzzleService.from(params)),
        filter((puzzle: Puzzle) => puzzle === undefined),
        take(1),
        map(() => this.router.navigate(['/', 'puzzles']))
      );

    this._puzzle$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.puzzleService.from(params)),
      filter((puzzle: Puzzle) => puzzle !== undefined)
    );

    this._loading$ = this.scoreService.loading$();
    this._puzzles$ = this.puzzleService.puzzles$();
    this._scores$ = this.scoreService.scores$();
  }
}
