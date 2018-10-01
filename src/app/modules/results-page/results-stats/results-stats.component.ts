import {Component, Input, OnInit} from '@angular/core';
import {Score} from "../../../services/score.service";

@Component({
  selector: 'app-results-stats',
  templateUrl: './results-stats.component.html',
  styleUrls: ['./results-stats.component.css']
})
export class ResultsStatsComponent implements OnInit {

  @Input() scores: Score[];

  constructor() { }

  ngOnInit() {
  }

}
