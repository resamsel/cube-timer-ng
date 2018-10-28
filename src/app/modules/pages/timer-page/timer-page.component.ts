import { Component, OnDestroy, OnInit } from '@angular/core';
import { Puzzle } from '../../../models/puzzle/puzzle.model';
import { PuzzleService } from '../../../services/puzzle.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { encode } from 'firebase-key';

@Component({
  selector: 'app-timer-page',
  templateUrl: './timer-page.component.html',
  styleUrls: ['./timer-page.component.css']
})
export class TimerPageComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = Subscription.EMPTY;

  constructor(
    private readonly puzzleService: PuzzleService,
    private readonly router: Router) {
  }

  ngOnInit(): void {
    this._subscription = this.puzzleService.puzzle$()
      .subscribe((puzzle: Puzzle) => {
        this.router.navigate(['/', 'puzzles', encode(puzzle.name), 'timer']);
      });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
