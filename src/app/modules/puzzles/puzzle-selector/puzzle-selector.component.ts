import { Component, Input, OnInit } from '@angular/core';
import { Puzzle, PuzzleService } from '../../../services/puzzle.service';
import { Observable } from "rxjs";

@Component({
  selector: 'app-puzzle-selector',
  templateUrl: './puzzle-selector.component.html',
  styleUrls: ['./puzzle-selector.component.scss']
})
export class PuzzleSelectorComponent implements OnInit {
  @Input() puzzles: Puzzle[];

  private _activePuzzle$: Observable<string>;

  get activePuzzle$(): Observable<string> {
    return this._activePuzzle$;
  }

  constructor(private readonly puzzleService: PuzzleService) {
  }

  onActivate(puzzle: Puzzle): void {
    this.puzzleService.activatePuzzle(puzzle.name);
  }

  ngOnInit() {
    this._activePuzzle$ = this.puzzleService.puzzle$();
  }
}
