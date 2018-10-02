import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule, MatListModule } from '@angular/material';
import { NavbarModule } from '../nav/navbar/navbar.module';
import { SidenavModule } from '../nav/sidenav/sidenav.module';
import { PuzzlesPageComponent } from './puzzles-page.component';
import { PuzzlesRoutingModule } from './puzzles-routing.module';

@NgModule({
  declarations: [
    PuzzlesPageComponent
  ],
  imports: [
    CommonModule,
    SidenavModule,
    NavbarModule,
    MatCardModule,
    MatListModule,
    PuzzlesRoutingModule
  ]
})
export class PuzzlesPageModule {
}
