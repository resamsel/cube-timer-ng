import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { Observable } from 'rxjs';
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
export class SettingsPageComponent implements OnInit {
  private _settings$: Observable<SettingsState>;
  private _user: User;

  get settings$(): Observable<SettingsState> {
    return this._settings$;
  }

  constructor(
    private readonly userService: UserService,
    private readonly settingsService: SettingsService
  ) {
  }

  ngOnInit() {
    this._settings$ = this.settingsService.settings();
    this.userService.authState().subscribe((user: User) => {
      this._user = user;
      this.settingsService.retrieveSettings(user.uid);
    });
  }

  onSave(settings: SettingsState): void {
    this.settingsService.update(this._user.uid, settings);
  }
}
