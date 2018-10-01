import {Component, Input, OnInit} from '@angular/core';
import {Score} from "../../../services/score.service";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  @Input() scores: Score[];

  constructor() {
  }

  ngOnInit() {
  }

}
