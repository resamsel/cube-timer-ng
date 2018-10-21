import { MediaMatcher } from '@angular/cdk/layout';
import { Component, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @Input() activePage: string;
  @ViewChild('sidenav') sidenav: MatSidenav;

  public xLargeQuery: MediaQueryList;

  constructor(media: MediaMatcher) {
    this.xLargeQuery = media.matchMedia('(min-width: 1200px)');
  }

  public toggle(): void {
    this.sidenav.toggle();
  }
}
