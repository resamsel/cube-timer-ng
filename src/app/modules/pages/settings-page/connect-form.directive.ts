import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { SettingsWriteAction } from '../../../services/settings.service';
import { AppState } from '../../../shared/app.state';

@Directive({
  selector: '[appConnectForm]'
})
export class ConnectFormDirective {
  @Input('appConnectForm')
  set data(value: any) {
    console.log('ConnectFormDirective', value);
    if (value) {
      this.formGroupDirective.form.patchValue(value);
      this.formGroupDirective.form.markAsPristine();
    }
  }

  constructor(
    private formGroupDirective: FormGroupDirective
  ) {
  }
}
