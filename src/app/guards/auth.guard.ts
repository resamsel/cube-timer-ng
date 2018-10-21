import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { filter, map } from 'rxjs/operators';
import { UserState } from '../models/user/user.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.user$()
      .pipe(
        filter((state: UserState) => state.user !== undefined),
        map((state: UserState) => {
          if (state.user === null) {
            this.router.navigate(['/']);
            return false;
          }
          return true;
        })
      );
  }
}
