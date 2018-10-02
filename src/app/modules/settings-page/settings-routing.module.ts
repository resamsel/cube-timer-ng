import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingsPageComponent } from './settings-page.component';

const settingsRoutes = [
  {path: 'settings', component: SettingsPageComponent}
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
