import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { PuzzleService } from '../services/puzzle.service';
import { AuthGuard } from './auth.guard';
import { UserService } from '../services/user.service';
import { Puzzle } from '../models/puzzle/puzzle.model';

@Injectable({
  providedIn: 'root'
})
export class PuzzleGuard implements CanActivate {
  constructor(
    private readonly authGuard: AuthGuard,
    private readonly puzzleService: PuzzleService,
    private readonly userService: UserService,
    private readonly router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authGuard.canActivate(next, state)
      .pipe(
        switchMap((auth: boolean) => {
          if (!auth) {
            // early exit, we're not logged-in
            return of(false);
          }

          return combineLatest(
            this.puzzleService.loaded$,
            this.puzzleService.loading$
          )
            .pipe(
              // Make sure puzzles have been loaded
              map(([loaded, loading]) => this.ensurePuzzlesLoaded(loaded, loading)),
              filter(loaded => loaded),
              switchMap(() => combineLatest(
                this.puzzleService.from(next.paramMap),
                this.puzzleService.puzzle$()
              )),
              take(1),
              map(([puzzle, activatedPuzzle]) => this.comparePuzzles(puzzle, activatedPuzzle))
            );
        })
      );
  }

  private ensurePuzzlesLoaded(loaded: boolean, loading: boolean): boolean {
    if (!loaded && !loading) {
      this.userService.user$()
        .pipe(take(1))
        .subscribe(userState => {
          if (userState.user) {
            this.puzzleService.loadPuzzles(userState.user.uid);
          }
        });
    }

    return loaded;
  }

  private comparePuzzles(puzzle: Puzzle | undefined, activatedPuzzle: Puzzle | undefined): boolean {
    if (puzzle === undefined) {
      this.router.navigate(['/', 'puzzles']);
      return false;
    }

    if (activatedPuzzle === undefined || puzzle.name !== activatedPuzzle.name) {
      this.puzzleService.activatePuzzle(puzzle.name);
    }

    return true;
  }
}
