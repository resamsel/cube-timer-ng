import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { Score } from '../../../../models/score/score.model';
import { ScoreService } from '../../../../services/score.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {
  @Input() scores: Score[];

  constructor(
    private scoreService: ScoreService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
  }

  public async onDelete(score: Score) {
    this.scoreService
      .delete(score)
      .then(() => this.onDeleted(score));
  }

  private onDeleted(score: Score): void {
    const snackBarRef = this.snackBar.open(
      `Score from ${moment(score.timestamp).fromNow()} has been deleted`,
      'Undo',
      {duration: 20000}
    );
    snackBarRef.onAction().subscribe(() => {
      this.scoreService.create(score)
        .then(() => this.snackBar.open(
          `Score from ${moment(score.timestamp).fromNow()} has been restored`,
          'Dismiss',
          {duration: 3000}
        ));
    });
  }
}
