import { Component, Input, OnInit } from '@angular/core';
import { Puzzle } from '../../../models/puzzle/puzzle.model';
import { PuzzleService } from '../../../services/puzzle.service';

@Component({
  selector: 'app-puzzle-selector',
  templateUrl: './puzzle-selector.component.html',
  styleUrls: ['./puzzle-selector.component.scss']
})
export class PuzzleSelectorComponent implements OnInit {
  @Input() puzzle: Puzzle;
  @Input() puzzles: Puzzle[];

  constructor(private readonly puzzleService: PuzzleService) {
  }

  ngOnInit() {
  }

  onActivate(puzzle: Puzzle): void {
    this.puzzleService.activatePuzzle(puzzle.name);
  }
}
