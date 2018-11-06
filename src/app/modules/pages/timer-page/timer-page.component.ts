import { Component, OnDestroy, OnInit } from '@angular/core';
import { Puzzle } from '../../../models/puzzle/puzzle.model';
import { Subscription } from 'rxjs';
import { encode } from 'firebase-key';
import { RouterUtils } from '../../../shared/router-utils';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-timer-page',
  templateUrl: './timer-page.component.html',
  styleUrls: ['./timer-page.component.css']
})
export class TimerPageComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = Subscription.EMPTY;

  constructor(
    private readonly routerUtils: RouterUtils,
    private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._subscription = this.routerUtils.onPuzzleChange(
      this.route,
      (puzzle: Puzzle) => ['/', 'puzzles', encode(puzzle.name)]
    );
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
