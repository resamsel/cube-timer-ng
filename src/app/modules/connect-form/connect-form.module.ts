import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConnectFormDirective } from './connect-form.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ConnectFormDirective],
  exports: [ConnectFormDirective]
})
export class ConnectFormModule {
}
