import { Component } from '@angular/core';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { SettingsService } from '../../../services/settings.service';
import { SettingsState } from '../../../models/settings/settings.reducer';

export interface Language {
  name: string;
  value: string;
}

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent {
  private _user: User;

  get settings$(): Observable<SettingsState> {
    return this.settingsService.settings$();
  }

  constructor(
    private readonly settingsService: SettingsService
  ) {
  }

  onSave(settings: SettingsState): void {
    this.settingsService.update(this._user.uid, settings);
  }
}
