import { MediaMatcher } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() activePage: string;
  @ViewChild('sidenav') sidenav: MatSidenav;

  public xLargeQuery: MediaQueryList;

  constructor(private media: MediaMatcher) {
    this.xLargeQuery = media.matchMedia('(min-width: 1200px)');
  }

  ngOnInit() {
  }

  public toggle(): void {
    this.sidenav.toggle();
  }
}
