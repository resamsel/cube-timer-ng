import { Component, Input } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() public sidenav: SidenavComponent;
  @Input() public page: string;
  @Input() public auth = true;

  constructor() {
  }

  async toggle() {
    this.sidenav.toggle();
  }
}
