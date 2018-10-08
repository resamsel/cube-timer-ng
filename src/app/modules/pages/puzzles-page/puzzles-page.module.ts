import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatSnackBarModule } from '@angular/material';
import { MomentModule } from 'ngx-moment';
import { NavbarModule } from '../../nav/navbar/navbar.module';
import { SidenavModule } from '../../nav/sidenav/sidenav.module';
import { PuzzleSelectorModule } from '../../puzzles/puzzle-selector/puzzle-selector.module';
import { PuzzlesPageComponent } from './puzzles-page.component';
import { PuzzlesRoutingModule } from './puzzles-routing.module';

@NgModule({
  declarations: [
    PuzzlesPageComponent
  ],
  imports: [
    CommonModule,
    SidenavModule,
    PuzzleSelectorModule,
    NavbarModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    PuzzlesRoutingModule,
    MomentModule
  ]
})
export class PuzzlesPageModule {
}
