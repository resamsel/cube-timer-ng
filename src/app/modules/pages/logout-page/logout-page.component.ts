import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-logout-page',
  template: ''
})
export class LogoutPageComponent implements OnInit {
  constructor(private readonly userService: UserService) {
  }

  ngOnInit() {
    this.userService.signOut();
  }
}
