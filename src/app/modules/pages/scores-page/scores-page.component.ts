import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Score, ScoreService } from '../../../services/score.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-scores-page',
  templateUrl: './scores-page.component.html',
  styleUrls: ['./scores-page.component.css']
})
export class ScoresPageComponent implements OnInit {
  private _scores$: Observable<Score[]>;

  get scores$(): Observable<Score[]> {
    return this._scores$;
  }

  constructor(
    private scoreService: ScoreService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.userService.authState()
      .pipe(take(1))
      .subscribe(() => {
        this._scores$ = this.scoreService.scores({limit: 20});
      });
  }
}
