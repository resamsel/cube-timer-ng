import { Component, Input, OnInit } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() public sidenav: SidenavComponent;
  @Input() public page: string;

  constructor() {
  }

  ngOnInit() {
  }

}
