import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material';
import { MainPageComponent } from './main-page.component';
import { UserService } from '../../../services/user.service';
import { instance, mock, when } from 'ts-mockito';
import { of } from 'rxjs';
import { PuzzleService } from '../../../services/puzzle.service';
import { RouterTestingModule } from '@angular/router/testing';
import { take } from 'rxjs/operators';

@Component({selector: 'app-footer', template: ''})
class FooterStubComponent {
}

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  const userService = mock(UserService);
  const puzzleService = mock(PuzzleService);

  when(userService.user$()).thenReturn(of({user: null}));
  when(puzzleService.puzzle$()).thenReturn(of({name: '3x3x3'}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainPageComponent, FooterStubComponent],
      imports: [
        MatIconModule,
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
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // given, when
    fixture.detectChanges();

    // then
    expect(component).toBeTruthy();
  });

  it('should display the correct link', async(() => {
    // given
    when(userService.user$()).thenReturn(of({
      user: {
        displayName: null,
        email: null,
        phoneNumber: null,
        photoURL: null,
        providerId: 'GOOGLE',
        uid: ''
      }
    }));
    const link$ = component.getStartedLink$();

    // when
    fixture.detectChanges();

    // then
    expect(link$).toBeDefined();
    link$.pipe(take(1))
      .subscribe((link: string[]) => expect(link).toEqual(['/', 'puzzles', '3x3x3', 'timer']));
  }));
});
