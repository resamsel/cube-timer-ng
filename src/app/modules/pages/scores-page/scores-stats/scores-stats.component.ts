import { Component, Input, OnInit } from '@angular/core';
import { Score } from '../../../../services/score.service';

@Component({
  selector: 'app-scores-stats',
  templateUrl: './scores-stats.component.html',
  styleUrls: ['./scores-stats.component.css']
})
export class ScoresStatsComponent implements OnInit {

  @Input() scores: Score[];

  constructor() {
  }

  ngOnInit() {
  }

}
