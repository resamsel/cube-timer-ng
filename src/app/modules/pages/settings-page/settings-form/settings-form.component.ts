import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsState } from '../../../../services/settings.service';
import { Language } from '../settings-page.component';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsFormComponent {
  @Input() settings: SettingsState;
  @Output() save: EventEmitter<SettingsState> = new EventEmitter<SettingsState>();

  public formGroup = new FormGroup({
    language: new FormControl(null, Validators.required),
    inspectionTime: new FormControl(null, Validators.required),
    soundAfterInspection: new FormControl(null),
    windowSize: new FormControl(null, [Validators.required, Validators.min(5), Validators.max(500)]),
    pageSize: new FormControl(null, [Validators.required, Validators.min(5), Validators.max(500)])
  });

  public languages: Language[] = [
    {name: 'English', value: 'en'},
    {name: 'German', value: 'de'},
  ];
  public inspectionTimes: number[] = [
    0, 3, 5, 10, 15
  ];

  onSubmit(): void {
    this.save.emit(this.formGroup.value);
  }
}
