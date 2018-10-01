import {Component, OnInit} from '@angular/core';
import {Page} from "../../shared/page.interface";

export interface TimerPage extends Page {
  reverseRoute: (puzzle: string) => string;
}

@Component({
  selector: 'app-timer-page',
  templateUrl: './timer-page.component.html',
  styleUrls: ['./timer-page.component.css']
})
export class TimerPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
