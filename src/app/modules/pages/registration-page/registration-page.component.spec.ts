import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPageComponent } from './registration-page.component';
import { Component, Input } from '@angular/core';
import { SidenavComponent } from '../../nav/sidenav/sidenav.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../../services/user.service';
import { instance, mock, when } from 'ts-mockito';
import { of } from 'rxjs';
import { initialUserState } from '../../../models/user/user.reducer';

@Component({selector: 'app-navbar', template: ''})
class NavbarStubComponent {
  @Input() public sidenav: SidenavComponent;
  @Input() public page: string;
  @Input() public auth = true;
}

describe('RegistrationPageComponent', () => {
  let component: RegistrationPageComponent;
  let fixture: ComponentFixture<RegistrationPageComponent>;
  const userService = mock(UserService);

  when(userService.user$()).thenReturn(of(initialUserState));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegistrationPageComponent,
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
        {provide: UserService, useValue: instance(userService)}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
