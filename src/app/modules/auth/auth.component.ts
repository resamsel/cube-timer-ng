import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { UserState } from '../../models/user/user.reducer';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(private readonly userService: UserService) {
  }

  public user$(): Observable<UserState> {
    return this.userService.user$();
  }

  signOut(): void {
    this.userService.signOut();
  }
}
