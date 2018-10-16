import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { NavbarModule } from '../../nav/navbar/navbar.module';
import { LoginRoutingModule } from '../login-page/login-routing.module';
import { RegistrationPageComponent } from './registration-page.component';
import { RegistrationRoutingModule } from './registration-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    NavbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule
  ],
  declarations: [RegistrationPageComponent]
})
export class RegistrationPageModule {
}
