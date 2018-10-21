import { Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { PuzzleService } from '../../../services/puzzle.service';
import { map } from 'rxjs/operators';
import { UserState } from '../../../models/user/user.reducer';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  constructor(
    private readonly userService: UserService,
    private readonly puzzleService: PuzzleService
  ) {
  }

  user$(): Observable<UserState> {
    return this.userService.user$();
  }

  getStartedLink$(): Observable<string[]> {
    return combineLatest(
      this.userService.user$(),
      this.puzzleService.puzzle$())
      .pipe(
        map(([user, puzzle]) => ['/', 'puzzles', puzzle.name, 'timer'])
      );
  }
}
