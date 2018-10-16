import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import { ConnectFormModule } from '../../connect-form/connect-form.module';
import { NavbarModule } from '../../nav/navbar/navbar.module';
import { SidenavModule } from '../../nav/sidenav/sidenav.module';
import { SettingsFormComponent } from './settings-form/settings-form.component';
import { SettingsPageComponent } from './settings-page.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [
    SettingsPageComponent,
    SettingsFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SidenavModule,
    NavbarModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    SettingsRoutingModule,
    ConnectFormModule
  ]
})
export class SettingsPageModule {
}
