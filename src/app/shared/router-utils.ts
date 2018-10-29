import { filter } from 'rxjs/operators';
import { Puzzle } from '../models/puzzle/puzzle.model';
import { PuzzleService } from '../services/puzzle.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class RouterUtils {

  constructor(
    private readonly puzzleService: PuzzleService,
    private readonly router: Router
  ) {
  }

  public onPuzzleChange(route: ActivatedRoute, puzzleRoute: (puzzle: Puzzle) => string[]): Subscription {
    return this.puzzleService.puzzle$()
      .pipe(
        filter(puzzle => !!puzzle && route.snapshot.paramMap.get('puzzle') !== puzzle.name)
      )
      .subscribe((puzzle: Puzzle) => {
        console.log('RouterUtils', puzzle, route.snapshot.paramMap);
        this.router.navigate(puzzleRoute(puzzle));
      });
  }
}
