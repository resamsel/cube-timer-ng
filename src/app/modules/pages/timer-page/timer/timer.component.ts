import { Component, OnInit } from '@angular/core';
import { PuzzleService } from "../../../../services/puzzle.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  private _activePuzzle$: Observable<string>;

  get activePuzzle$(): Observable<string> {
    return this._activePuzzle$;
  }

  constructor(private readonly puzzleService: PuzzleService) {
  }

  ngOnInit() {
    this._activePuzzle$ = this.puzzleService.puzzle$();
  }
}
