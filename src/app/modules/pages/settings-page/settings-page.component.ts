import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from '../../../services/settings.service';
import { SettingsState } from '../../../models/settings/settings.reducer';
import { UserService } from '../../../services/user.service';
import { take } from 'rxjs/operators';
import { UserState } from '../../../models/user/user.reducer';
import { MatSnackBar } from '@angular/material';

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
  get settings$(): Observable<SettingsState> {
    return this.settingsService.settings$();
  }

  constructor(
    private readonly userService: UserService,
    private readonly settingsService: SettingsService,
    private readonly snackBar: MatSnackBar
  ) {
  }

  onSave(settings: SettingsState): void {
    this.userService.user$()
      .pipe(take(1))
      .subscribe((state: UserState) => {
        if (state.user) {
          this.settingsService.update(state.user.uid, settings)
            .then(() => this.snackBar.open(
              'Settings saved',
              'Dismiss',
              {
                duration: 1000
              }))
          ;
        }
      });
  }
}
