import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'firebase';
import { Observable, Subscription } from 'rxjs';
import { SettingsService, SettingsState } from '../../../services/settings.service';
import { UserService } from '../../../services/user.service';

export interface Language {
  name: string;
  value: string;
}

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit, OnDestroy {
  private _settings$: Observable<SettingsState>;
  private _user: User;
  private _subscription = Subscription.EMPTY;

  get settings$(): Observable<SettingsState> {
    return this._settings$;
  }

  constructor(
    private readonly settingsService: SettingsService
  ) {
  }

  ngOnInit() {
    this._settings$ = this.settingsService.settings();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  onSave(settings: SettingsState): void {
    this.settingsService.update(this._user.uid, settings);
  }
}
