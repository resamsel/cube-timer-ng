import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { UserService, UserState } from '../../../services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  formGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required)
  });

  get email(): AbstractControl {
    return this.formGroup.get('email');
  }

  get password(): AbstractControl {
    return this.formGroup.get('password');
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

  signInWithGoogle(): void {
    this.userService.signInWithGoogle();
  }

  signInWithEmailAndPassword(): void {
    console.log('credentials', this.email, this.password);
    this.userService.signInWithEmailAndPassword(this.email.value, this.password.value)
      .catch((reason: { code: string, message: string }) => {
        switch (reason.code) {
          case 'auth/invalid-email':
            this.email.setErrors({provider: reason.message});
            break;
          case 'auth/wrong-password':
            this.password.setErrors({provider: reason.message});
            break;
          default:
            this.formGroup.setErrors({provider: reason.message});
            break;
        }
      });
  }
}
