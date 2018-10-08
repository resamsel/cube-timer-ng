import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatMenuModule } from '@angular/material';
import { of } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';
import { UserService } from '../../services/user.service';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async(() => {
    const userService = mock(UserService);

    when(userService.user$()).thenReturn(of({user: null}));

    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [
        MatIconModule,
        MatMenuModule
      ],
      providers: [
        {provide: UserService, useValue: instance(userService)}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
