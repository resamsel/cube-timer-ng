import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { UserService, UserState } from '../../../services/user.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent {
  formGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    passwordRepeat: new FormControl(null, Validators.required)
  });

  get email(): AbstractControl {
    return this.formGroup.get('email');
  }

  get password(): AbstractControl {
    return this.formGroup.get('password');
  }

  get passwordRepeat(): AbstractControl {
    return this.formGroup.get('passwordRepeat');
  }

  constructor(
    private readonly userService: UserService,
    private readonly router: Router) {
    userService.user$()
      .pipe(
        filter((state: UserState) => state.user != null),
        take(1)
      )
      .subscribe(() => router.navigate(['/', 'timer']));
  }

  register(): void {
    this.userService.register(this.email.value, this.password.value)
      .catch((reason: { code: string, message: string }) => {
        console.error('Register', reason);
        switch (reason.code) {
          case 'auth/invalid-email':
            this.email.setErrors({provider: reason.message});
            break;
          case 'auth/email-already-in-use':
            this.email.setErrors({provider: reason.message});
            break;
          default:
            this.formGroup.setErrors({provider: reason.message});
            break;
        }
      });
  }
}
