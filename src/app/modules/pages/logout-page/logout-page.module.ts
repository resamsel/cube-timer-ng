import { NgModule } from '@angular/core';
import { LogoutPageComponent } from './logout-page.component';
import { LogoutRoutingModule } from './logout-routing.module';

@NgModule({
  imports: [LogoutRoutingModule],
  declarations: [LogoutPageComponent]
})
export class LogoutPageModule {
}
