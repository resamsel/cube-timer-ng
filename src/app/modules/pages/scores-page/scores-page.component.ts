import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { PuzzleListState, PuzzleService } from '../../../services/puzzle.service';
import { ScoreListState, ScoreService } from '../../../services/score.service';
import { SettingsService } from '../../../services/settings.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-scores-page',
  templateUrl: './scores-page.component.html',
  styleUrls: ['./scores-page.component.css']
})
export class ScoresPageComponent implements OnInit {
  private _puzzles$: Observable<PuzzleListState>;
  private _scores$: Observable<ScoreListState>;
  private _user: User;

  get puzzles$(): Observable<PuzzleListState> {
    return this._puzzles$;
  }

  get scores$(): Observable<ScoreListState> {
    return this._scores$;
  }

  constructor(
    private scoreService: ScoreService,
    private userService: UserService,
    private puzzleService: PuzzleService,
    private settingsService: SettingsService
  ) {
  }

  ngOnInit() {
    this._puzzles$ = this.puzzleService.puzzles();
    this._scores$ = this.scoreService.scores();
    this.settingsService.settings().subscribe(settings => {
      this.puzzleService.puzzle()
        .subscribe((puzzle: string) => this.scoreService.retrieveScores(settings.uid, puzzle, {limit: settings.pageSize}));
      this.puzzleService.retrievePuzzles(settings.uid);
    })

    this.userService.authState()
      .subscribe((user: User) => {
        this._user = user;
        if (user !== null) {
          this.settingsService.retrieveSettings(user.uid);
        }
      });
  }
}
