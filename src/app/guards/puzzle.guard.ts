import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { PuzzleService } from '../services/puzzle.service';
import { AuthGuard } from './auth.guard';

@Injectable({
  providedIn: 'root'
})
export class PuzzleGuard implements CanActivate {
  constructor(
    private readonly authGuard: AuthGuard,
    private readonly puzzleService: PuzzleService,
    private readonly router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authGuard.canActivate(next, state)
      .pipe(
        switchMap((auth: boolean) => {
          console.log('PuzzleGuard - authGuard.canActivate', auth);
          if (!auth) {
            return Observable.create(false);
          }

          // TODO: make sure puzzles are loaded
          return combineLatest(
            this.puzzleService.from(next.paramMap),
            this.puzzleService.puzzle$()
          )
            .pipe(
              take(1),
              map(([puzzle, activatedPuzzle]) => {
                if (puzzle === undefined) {
                  this.router.navigate(['/', 'puzzles']);
                  return false;
                }

                if (puzzle.name !== activatedPuzzle.name) {
                  this.puzzleService.activatePuzzle(puzzle.name);
                }

                return true;
              })
            );
        })
      );
  }
}
