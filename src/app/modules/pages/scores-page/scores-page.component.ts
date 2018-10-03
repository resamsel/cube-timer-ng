import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Score, ScoreService, ScoreListState } from '../../../services/score.service';
import { UserService } from '../../../services/user.service';
import { AppState } from '../../../shared/app.state';

@Component({
  selector: 'app-scores-page',
  templateUrl: './scores-page.component.html',
  styleUrls: ['./scores-page.component.css']
})
export class ScoresPageComponent implements OnInit {
  private _scores$: Observable<ScoreListState>;

  get scores$(): Observable<ScoreListState> {
    return this._scores$;
  }

  constructor(
    private scoreService: ScoreService,
    private userService: UserService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this._scores$ = this.store.pipe(select('scores'));
    this.userService.authState()
      .pipe(take(1))
      .subscribe(() => {
        this.store
          .pipe(select('puzzle'))
          .subscribe(puzzle => this.scoreService.scores(puzzle, {limit: 20}));
      });
  }
}
