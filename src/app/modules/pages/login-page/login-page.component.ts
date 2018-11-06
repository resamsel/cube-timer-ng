import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { encode } from 'firebase-key';
import { combineLatest } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { UserState } from '../../../models/user/user.reducer';
import { PuzzleService } from '../../../services/puzzle.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
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
    private readonly route: ActivatedRoute,
    private readonly router: Router) {
  }

  ngOnInit() {
    combineLatest(
      this.userService.user$().pipe(filter((state: UserState) => !!state.user)),
      this.puzzleService.puzzle$())
      .pipe(take(1))
      .subscribe(([, puzzle]) => {
        const redirectUri = this.route.snapshot.queryParamMap.get('redirect_uri');
        if (redirectUri) {
          return this.router.navigate([redirectUri]);
        }

        if (puzzle === undefined) {
          return this.router.navigate(['/', 'puzzles']);
        }

        return this.router.navigate(['/', 'puzzles', encode(puzzle.name)]);
      });
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
