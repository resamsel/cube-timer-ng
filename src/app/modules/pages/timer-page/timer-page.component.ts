import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Puzzle } from '../../../models/puzzle/puzzle.model';
import { PuzzleService } from '../../../services/puzzle.service';

@Component({
  selector: 'app-timer-page',
  templateUrl: './timer-page.component.html',
  styleUrls: ['./timer-page.component.css']
})
export class TimerPageComponent implements OnInit {
  private _puzzles$: Observable<Puzzle[]>;
  private _puzzle$: Observable<Puzzle>;

  get puzzle$(): Observable<Puzzle> {
    return this._puzzle$;
  }

  get puzzles$(): Observable<Puzzle[]> {
    return this._puzzles$;
  }

  constructor(
    private readonly puzzleService: PuzzleService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) {
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
    this._puzzles$ = this.puzzleService.puzzles$();
  }
}
