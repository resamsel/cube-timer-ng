import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { NavbarModule } from '../nav/navbar/navbar.module';
import { SidenavModule } from '../nav/sidenav/sidenav.module';
import { SettingsPageComponent } from './settings-page.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [
    SettingsPageComponent
  ],
  imports: [
    CommonModule,
    SidenavModule,
    NavbarModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    SettingsRoutingModule
  ]
})
export class SettingsPageModule {
}
