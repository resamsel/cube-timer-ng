import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(public userService: UserService) {
  }

  ngOnInit() {
  }

  signInWithGoogle(): void {
    this.userService.signIn();
  }

  signOut(): void {
    this.userService.signOut();
  }
}
