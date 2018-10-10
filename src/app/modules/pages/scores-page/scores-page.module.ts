import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';
import { MomentModule } from 'ngx-moment';
import { NavbarModule } from '../../nav/navbar/navbar.module';
import { SidenavModule } from '../../nav/sidenav/sidenav.module';
import { PuzzleSelectorModule } from '../../puzzles/puzzle-selector/puzzle-selector.module';
import { ScoresPageComponent } from './scores-page.component';
import { ScoresRoutingModule } from './scores-routing.module';
import { ScoresStatsComponent } from './scores-stats/scores-stats.component';
import { ScoresComponent } from './scores/scores.component';

@NgModule({
  declarations: [
    ScoresPageComponent,
    ScoresComponent,
    ScoresStatsComponent
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
    ScoresRoutingModule,
    PuzzleSelectorModule,
    MatProgressSpinnerModule,
    MomentModule
  ]
})
export class ScoresPageModule {
}
