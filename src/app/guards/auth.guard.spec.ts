import { inject, TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { UserService } from '../services/user.service';
import { instance, mock } from 'ts-mockito';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        AuthGuard,
        {provide: UserService, useValue: instance(mock(UserService))}
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
