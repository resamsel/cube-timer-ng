import { Component, OnInit } from '@angular/core';
import { Puzzle, PuzzleService } from "../../../services/puzzle.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-timer-page',
  templateUrl: './timer-page.component.html',
  styleUrls: ['./timer-page.component.css']
})
export class TimerPageComponent implements OnInit {
  private _puzzles$: Observable<Puzzle[]>;

  get puzzles$(): Observable<Puzzle[]> {
    return this._puzzles$;
  }

  constructor(private readonly puzzleService: PuzzleService) {
  }

  ngOnInit() {
    this._puzzles$ = this.puzzleService.puzzles$();
  }
}
