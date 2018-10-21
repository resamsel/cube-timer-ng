import { Component } from '@angular/core';
import { Puzzle } from '../../../models/puzzle/puzzle.model';
import { PuzzleService } from '../../../services/puzzle.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-puzzle-selector',
  templateUrl: './puzzle-selector.component.html',
  styleUrls: ['./puzzle-selector.component.scss']
})
export class PuzzleSelectorComponent {
  constructor(private readonly puzzleService: PuzzleService) {
  }

  puzzle$(): Observable<Puzzle> {
    return this.puzzleService.puzzle$();
  }

  puzzles$(): Observable<Puzzle[]> {
    return this.puzzleService.puzzles$();
  }

  onActivate(puzzle: Puzzle): void {
    this.puzzleService.activatePuzzle(puzzle.name);
  }
}
