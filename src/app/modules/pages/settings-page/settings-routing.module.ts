import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../guards/auth.guard';
import { SettingsPageComponent } from './settings-page.component';

const settingsRoutes: Route[] = [
  {path: 'settings', component: SettingsPageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forChild(settingsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SettingsRoutingModule {
}
