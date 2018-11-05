import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { UserState } from '../../../models/user/user.reducer';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  formGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    passwordRepeat: new FormControl(null, Validators.required)
  });

  get email(): AbstractControl | null {
    return this.formGroup.get('email');
  }

  get password(): AbstractControl | null {
    return this.formGroup.get('password');
  }

  get passwordRepeat(): AbstractControl | null {
    return this.formGroup.get('passwordRepeat');
  }

  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) {
  }

  ngOnInit() {
    this.userService.user$()
      .pipe(
        filter((state: UserState) => state.user != null),
        take(1)
      )
      .subscribe(() => {
        const redirectUri = this.route.snapshot.queryParamMap.get('redirect_uri');
        if (redirectUri) {
          return this.router.navigate([redirectUri]);
        }

        return this.router.navigate(['/', 'puzzles']);
      });
  }

  register(): void {
    this.userService.register(
      this.email !== null ? this.email.value : '',
      this.password !== null ? this.password.value : '')
      .catch((reason: { code: string, message: string }) => {
        console.error('Register', reason);
        switch (reason.code) {
          case 'auth/invalid-email':
            if (this.email !== null) {
              this.email.setErrors({provider: reason.message});
            }
            break;
          case 'auth/email-already-in-use':
            if (this.email !== null) {
              this.email.setErrors({provider: reason.message});
            }
            break;
          default:
            this.formGroup.setErrors({provider: reason.message});
            break;
        }
      });
  }
}
