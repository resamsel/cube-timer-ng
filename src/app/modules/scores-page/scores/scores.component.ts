import {Component, Input, OnInit} from '@angular/core';
import {Score} from '../../../services/score.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
  @Input() scores: Score[];

  constructor() {
  }

  ngOnInit() {
  }

}
