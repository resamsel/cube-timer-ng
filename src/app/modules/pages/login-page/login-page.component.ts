import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { UserService } from '../../../services/user.service';
import { PuzzleService } from '../../../services/puzzle.service';
import { UserState } from '../../../models/user/user.reducer';
import { combineLatest } from 'rxjs';
import { encode } from 'firebase-key';

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

  get email(): AbstractControl | null {
    return this.formGroup.get('email');
  }

  get password(): AbstractControl | null {
    return this.formGroup.get('password');
  }

  constructor(
    private readonly userService: UserService,
    private readonly puzzleService: PuzzleService,
    private readonly router: Router) {
    combineLatest(
      userService.user$().pipe(filter((state: UserState) => {
        return !!state.user;
      })),
      puzzleService.puzzle$())
      .pipe(take(1))
      .subscribe(([, puzzle]) => router.navigate(['/', 'puzzles', encode(puzzle.name), 'timer']));
  }

  signInWithGoogle(): void {
    this.userService.signInWithGoogle();
  }

  signInWithEmailAndPassword(): void {
    this.userService.signInWithEmailAndPassword(
      this.email !== null ? this.email.value : '',
      this.password !== null ? this.password.value : '')
      .catch((reason: { code: string, message: string }) => {
        console.error('Error while signing in with email and password', reason);
        switch (reason.code) {
          case 'auth/invalid-email':
            if (this.email !== null) {
              this.email.setErrors({provider: reason.message});
            }
            break;
          case 'auth/wrong-password':
            if (this.password !== null) {
              this.password.setErrors({provider: reason.message});
            }
            break;
          default:
            this.formGroup.setErrors({provider: reason.message});
            break;
        }
      });
  }
}
