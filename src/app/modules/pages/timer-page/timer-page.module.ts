import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule
} from '@angular/material';
import { NavbarModule } from '../../nav/navbar/navbar.module';
import { SidenavModule } from '../../nav/sidenav/sidenav.module';
import { TimerPageComponent } from './timer-page.component';
import { TimerRoutingModule } from './timer-routing.module';
import { TimerStatsComponent } from './timer-stats/timer-stats.component';
import { TimerComponent } from './timer/timer.component';
import { PuzzleSelectorModule } from "../../puzzles/puzzle-selector/puzzle-selector.module";

@NgModule({
  declarations: [
    TimerPageComponent,
    TimerComponent,
    TimerStatsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SidenavModule,
    PuzzleSelectorModule,
    NavbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    TimerRoutingModule
  ]
})
export class TimerPageModule {

}
