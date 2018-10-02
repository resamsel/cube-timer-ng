import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatSnackBarModule } from '@angular/material';
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
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    PuzzlesRoutingModule
  ]
})
export class PuzzlesPageModule {
}
