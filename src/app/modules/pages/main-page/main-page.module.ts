import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { NavbarModule } from '../../nav/navbar/navbar.module';
import { FooterComponent } from './footer/footer.component';
import { MainPageComponent } from './main-page.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [
    MainPageComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    MatIconModule,
    MatButtonModule,
    MainRoutingModule
  ]
})
export class MainPageModule {
}
