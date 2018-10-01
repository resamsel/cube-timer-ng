import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Score, ScoreService} from "../../services/score.service";

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.css']
})
export class ResultsPageComponent implements OnInit {
  private _scores$: Observable<Score[]>;

  get scores$(): Observable<Score[]> {
    return this._scores$;
  }

  constructor(private scoreService: ScoreService) {
  }

  ngOnInit() {
    this._scores$ = this.scoreService.scores();
  }
}
