import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService, UserState } from '../../../services/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  constructor(private readonly userService: UserService) { }

  user$(): Observable<UserState> {
    return this.userService.user$();
  }
}
