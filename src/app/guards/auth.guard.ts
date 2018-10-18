import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService, UserState } from '../services/user.service';
import { map } from 'rxjs/operators';

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
