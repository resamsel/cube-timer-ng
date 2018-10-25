import { async, TestBed } from '@angular/core/testing';
import { instance, mock } from 'ts-mockito';
import { Store } from '@ngrx/store';
import { UserService } from './user.service';
import { AppState } from '../shared/app.state';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let angularFireAuth: any;
  let store: Store<AppState>;

  beforeEach(async(() => {
    angularFireAuth = {
      authState: of({uid: '123', email: 'a@b.com'})
    };
    store = mock(Store);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: AngularFireAuth, useValue: angularFireAuth},
        {provide: Store, useValue: instance(store)}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
