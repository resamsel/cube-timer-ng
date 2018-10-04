import { Component, Input, OnInit } from '@angular/core';
import { Puzzle } from '../../../services/puzzle.service';

@Component({
  selector: 'app-puzzle-selector',
  templateUrl: './puzzle-selector.component.html',
  styleUrls: ['./puzzle-selector.component.css']
})
export class PuzzleSelectorComponent implements OnInit {
  @Input() puzzles: Puzzle[];

  constructor() {
  }

  ngOnInit() {
  }
}
