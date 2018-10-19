import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule
} from '@angular/material';
import { ConnectFormModule } from '../../connect-form/connect-form.module';
import { NavbarModule } from '../../nav/navbar/navbar.module';
import { SidenavModule } from '../../nav/sidenav/sidenav.module';
import { PuzzleSelectorModule } from '../../puzzles/puzzle-selector/puzzle-selector.module';
import { TimerPageComponent } from './timer-page.component';
import { TimerRoutingModule } from './timer-routing.module';
import { TimerStatsComponent } from './timer-stats/timer-stats.component';
import { TimerComponent } from './timer/timer.component';

@NgModule({
  declarations: [
    TimerPageComponent,
    TimerComponent,
    TimerStatsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    TimerRoutingModule,
    ConnectFormModule
  ]
})
export class TimerPageModule {
}
