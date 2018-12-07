import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { Score } from '../../../../models/score/score.model';
import { ScoreService } from '../../../../services/score.service';
import {
  minusDays,
  minusMonths,
  minusWeeks,
  startOfDay,
  startOfMonth,
  startOfWeek
} from '../../../../shared/date-time-utils';

interface GroupedScore extends Score {
  key?: string;
}

function dateGroups(): { [key: number]: string } {
  const groups: { [key: number]: string } = {};
  const now = new Date();

  groups[startOfDay(now).getTime()] = 'today';
  groups[minusDays(startOfDay(now), 1).getTime()] = 'yesterday';
  groups[startOfWeek(now).getTime()] = 'this week';
  groups[minusWeeks(startOfWeek(now), 1).getTime()] = 'last week';
  groups[startOfMonth(now).getTime()] = 'this month';
  groups[minusMonths(startOfMonth(now), 1).getTime()] = 'last month';

  return groups;
}

function scoreGroupKey(score: Score, currentKey: string, groups: { [key: number]: string }): string | undefined {
  const groupKeys: number[] = Object.keys(groups).map(k => parseInt(k, 10)).sort((a, b) => b - a);
  const groupKey = groupKeys.find((element: number) => score.timestamp > element);
  let key: string | undefined;
  if (groupKey === undefined) {
    key = `${startOfDay(new Date(score.timestamp || 0))}` || undefined;
  } else {
    key = groups[groupKey];
  }

  if (key === currentKey) {
    return undefined;
  }

  return key;
}

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent {
  scoresGrouped: GroupedScore[];
  private _scores: Score[];

  @Input() set scores(scores: Score[]) {
    this._scores = scores;
    const groups = dateGroups();
    let currentKey = '';
    this.scoresGrouped = scores
      .map(score => {
        console.log('score', score);
        const key = scoreGroupKey(score, currentKey, groups);
        if (key !== undefined) {
          currentKey = key;
        }
        return {
          ...score,
          key: key
        };
      });
  }

  get scores(): Score[] {
    return this._scores;
  }

  constructor(
    private scoreService: ScoreService,
    private snackBar: MatSnackBar
  ) {
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
