import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Puzzle, PuzzleService} from "../../services/puzzle.service";

@Component({
  selector: 'app-puzzles-page',
  templateUrl: './puzzles-page.component.html',
  styleUrls: ['./puzzles-page.component.css']
})
export class PuzzlesPageComponent implements OnInit {
  private _puzzles$: Observable<Puzzle[]>;

  get puzzles$(): Observable<Puzzle[]> {
    return this._puzzles$;
  }

  constructor(private puzzleService: PuzzleService) {
  }

  ngOnInit() {
    this._puzzles$ = this.puzzleService.puzzles();
  }
}
