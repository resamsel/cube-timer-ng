import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Puzzle } from '../../../models/puzzle/puzzle.model';
import { Score } from '../../../models/score/score.model';
import { PuzzleService } from '../../../services/puzzle.service';
import { ScoreService } from '../../../services/score.service';
import { encode } from 'firebase-key';
import { RouterUtils } from '../../../shared/router-utils';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scores-page',
  templateUrl: './scores-page.component.html',
  styleUrls: ['./scores-page.component.css']
})
export class ScoresPageComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = Subscription.EMPTY;

  get loading$(): Observable<boolean> {
    return this.scoreService.loading$();
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
    private readonly routerUtils: RouterUtils,
    private readonly route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this._subscription = this.routerUtils.onPuzzleChange(
      this.route,
      (puzzle: Puzzle) => ['/', 'puzzles', encode(puzzle.name), 'scores']
    );
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
