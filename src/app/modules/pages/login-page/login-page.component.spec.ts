import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { Component, Input } from '@angular/core';
import { SidenavComponent } from '../../nav/sidenav/sidenav.component';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { instance, mock, when } from 'ts-mockito';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PuzzleService } from '../../../services/puzzle.service';

@Component({selector: 'app-navbar', template: ''})
class NavbarStubComponent {
  @Input() public sidenav: SidenavComponent;
  @Input() public page: string;
  @Input() public auth = true;
}

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  const userService = mock(UserService);
  const puzzleService = mock(PuzzleService);

  when(userService.user$()).thenReturn(of({user: null}));
  when(puzzleService.puzzle$()).thenReturn(of({name: '3x3x3'}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginPageComponent,
        NavbarStubComponent
      ],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        RouterTestingModule
      ],
      providers: [
        {provide: UserService, useValue: instance(userService)},
        {provide: PuzzleService, useValue: instance(puzzleService)}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
