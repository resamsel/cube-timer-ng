import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange, MatFormField, MatSelect } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SettingsService, SettingsState } from '../../../services/settings.service';
import { UserService } from '../../../services/user.service';
import { AppState } from '../../../shared/app.state';

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
  public languages: Language[] = [
    {name: 'English', value: 'en'},
    {name: 'German', value: 'de'},
  ];
  public inspectionTimes: number[] = [
    0, 3, 5, 10, 15
  ];

  public languageFormControl: FormControl = new FormControl('language');
  public inspectionTimeFormControl: FormControl = new FormControl('inspectionTime');
  public windowSizeFormControl: FormControl = new FormControl('windowSize');

  private _settings$: Observable<SettingsState>;
  private _user: firebase.User;

  get settings$(): Observable<SettingsState> {
    return this._settings$;
  }

  constructor(
    private readonly userService: UserService,
    private readonly settingsService: SettingsService,
    private readonly store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this._settings$ = this.store.pipe(select('settings'));
    this.userService.authState().subscribe(user => {
      this._user = user;
      this.settingsService.settings(user.uid);
    });

    this.languageFormControl.valueChanges
      .subscribe((value: string) => this.update({language: value}));
    this.inspectionTimeFormControl.valueChanges
      .subscribe((value: number) => this.update({inspectionTime: value}));
    this.windowSizeFormControl.valueChanges
      .subscribe((value: number) => this.update({windowSize: value}));
  }

  public onSoundAfterInspectionChange(event: MatCheckboxChange): void {
    this.update({soundAfterInspection: event.checked});
  }

  private update(settings: Partial<SettingsState>): void {
    this.settingsService.update(this._user.uid, settings);
  }
}
