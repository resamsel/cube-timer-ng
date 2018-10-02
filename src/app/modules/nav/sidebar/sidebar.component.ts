import { Component, Input, OnInit } from '@angular/core';
import { Page } from '../../../shared/page.interface';

const LINKS: {
  page: Page;
  link: string;
}[] = [
  {page: {id: 'timer', name: 'Timer', icon: 'timer'}, link: '/timer'},
  {page: {id: 'scores', name: 'Scores', icon: 'assessment'}, link: '/scores'},
  {page: {id: 'puzzles', name: 'Puzzles', icon: 'games'}, link: '/puzzles'},
  {page: {id: 'settings', name: 'Settings', icon: 'settings'}, link: '/settings'}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public links: { page: Page, link: string }[] = LINKS;

  @Input() activePage: string;

  constructor() {
  }

  ngOnInit() {
  }
}
