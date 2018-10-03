import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import { NavbarModule } from '../../nav/navbar/navbar.module';
import { SidenavModule } from '../../nav/sidenav/sidenav.module';
import { SettingsPageComponent } from './settings-page.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [
    SettingsPageComponent
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
    SettingsRoutingModule
  ]
})
export class SettingsPageModule {
}
