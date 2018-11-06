import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Score } from '../../../../models/score/score.model';

@Component({
  selector: 'app-scores-stats',
  templateUrl: './scores-stats.component.html',
  styleUrls: ['./scores-stats.component.css']
})
export class ScoresStatsComponent implements OnInit {

  get data(): { name: string, value: number }[] {
    return this.scores.map((score: Score) => ({
      name: this.dateFormatPipe.transform(score.timestamp, 'full') || '',
      value: score.value
    }));
  }

  @Input() scores: Score[];

  constructor(private readonly dateFormatPipe: DatePipe) {
  }

  ngOnInit() {
  }
}
