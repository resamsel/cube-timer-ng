import { async, TestBed } from '@angular/core/testing';
import { instance, mock, when } from 'ts-mockito';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserService } from './user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppState } from '../shared/app.state';
import { initialUserState } from '../models/user/user.reducer';
import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;
  let userService: UserService;
  let database: AngularFirestore;
  let store: Store<AppState>;

  beforeEach(async(() => {
    userService = mock(UserService);
    database = mock(AngularFirestore);
    store = mock(Store);

    when(userService.user$()).thenReturn(of(initialUserState));

    TestBed.configureTestingModule({
      providers: [
        {provide: AngularFirestore, useValue: instance(database)},
        {provide: Store, useValue: instance(store)},
        {provide: UserService, useValue: instance(userService)}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
