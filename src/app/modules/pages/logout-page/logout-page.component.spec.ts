import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutPageComponent } from './logout-page.component';
import { instance, mock, when } from 'ts-mockito';
import { UserService } from '../../../services/user.service';
import { of } from 'rxjs';
import { initialUserState } from '../../../models/user/user.reducer';

describe('LogoutPageComponent', () => {
  let component: LogoutPageComponent;
  let fixture: ComponentFixture<LogoutPageComponent>;

  beforeEach(async(() => {
    const userService = mock(UserService);

    when(userService.user$()).thenReturn(of(initialUserState));

    TestBed.configureTestingModule({
      declarations: [LogoutPageComponent],
      providers: [
        {provide: UserService, useValue: instance(userService)}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
