import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../shared/app.state';
import { UserService } from './user.service';
import { reducer, SettingsState } from '../models/settings/settings.reducer';
import { LoadSettings } from '../models/settings/settings.actions';
import { UserState } from '../models/user/user.reducer';
import { User } from '../models/user/user.model';

@Injectable({providedIn: 'root'})
export class SettingsService {
  public static reducer = reducer;

  private _subscription: Subscription = Subscription.EMPTY;

  constructor(
    private readonly userService: UserService,
    private readonly database: AngularFirestore,
    private readonly store: Store<AppState>) {
    userService.user$().subscribe((state: UserState) => {
      if (state.user) {
        this._subscription.unsubscribe();
        this.loadSettings(state.user.uid);
      }
    });
  }

  public settings$(): Observable<SettingsState> {
    return this.store.pipe(select(state => state.settings));
  }

  private loadSettings(uid: string): void {
    this._subscription = this.database
      .doc<User>(`/users/${uid}`)
      .valueChanges()
      .subscribe((user: User | undefined) => {
        if (user !== undefined) {
          this.store.dispatch(new LoadSettings({state: user}));
        }
      });
  }

  public update(uid: string, settings: Partial<SettingsState>): Promise<void> {
    return this.database
      .doc(`/users/${uid}`)
      .set(settings, {merge: true});
  }
}
