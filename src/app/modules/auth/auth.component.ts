import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService, UserState } from '../../services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  constructor(private readonly userService: UserService) {
  }

  ngOnInit() {
  }

  public user$(): Observable<UserState> {
    return this.userService.user$();
  }

  signIn(): void {
    this.userService.signIn();
  }

  signOut(): void {
    this.userService.signOut();
  }
}
