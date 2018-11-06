import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserState } from '../models/user/user.reducer';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<boolean> {
    return this.userService.user$()
      .pipe(
        filter(state => state.user !== undefined),
        map((state: UserState) => {
          if (!state.user) {
            this.router.navigate(['/', 'login'], {queryParams: {redirect_uri: next.url.join('/')}});
            return false;
          }
          return true;
        })
      );
  }
}
