import { Component, OnInit } from '@angular/core';

export interface Language {
  name: string;
  value: string;
}

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {
  public languages: Language[] = [
    {name: 'English', value: 'en'},
    {name: 'German', value: 'de'},
  ];
  public inspectionTimes: number[] = [
    0, 3, 5, 10, 15
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
