import {Component, Input, OnInit} from '@angular/core';
import {Page} from "../../../shared/page.interface";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public links: { page: Page, link: string }[] = [
    // {page: TimerPageComponent.page, link: TimerPageComponent.page.reverseRoute('3x3x3')},
    {page: {id: 'results', name: 'Results', icon: 'assessment', route: undefined}, link: '/results'},
    {page: {id: 'puzzles', name: 'Puzzles', icon: 'games', route: undefined}, link: '/puzzles'},
    // {page: SettingsPageComponent.page, link: SettingsPageComponent.page.reverseRoute()}
  ];

  @Input() activePage: string;
  public puzzle: string = '3x3x3';

  constructor() {
  }

  ngOnInit() {
  }
}
