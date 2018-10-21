import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Puzzle } from '../models/puzzle/puzzle.model';
import { PuzzleService } from '../services/puzzle.service';

@Injectable({
  providedIn: 'root'
})
export class PuzzleGuard implements CanActivate {
  constructor(
    private readonly puzzleService: PuzzleService,
    private readonly router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.puzzleService.from(next.paramMap)
      .pipe(
        map((puzzle: Puzzle | undefined) => {
          console.log('Puzzle guard', puzzle);
          if (puzzle === undefined) {
            this.router.navigate(['/', 'puzzles']);
            return false;
          }
          return true;
        })
      );
  }
}
