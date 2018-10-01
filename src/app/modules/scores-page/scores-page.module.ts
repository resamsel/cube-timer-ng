import {NgModule} from '@angular/core';
import { MomentModule } from 'ngx-moment';
import {NavbarModule} from '../nav/navbar/navbar.module';
import {SidenavModule} from '../nav/sidenav/sidenav.module';
import {ScoresRoutingModule} from './scores-routing.module';
import {MatCardModule, MatIconModule, MatListModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {ScoresComponent} from './scores/scores.component';
import {ScoresPageComponent} from './scores-page.component';
import {ScoresStatsComponent} from './scores-stats/scores-stats.component';

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
    ScoresRoutingModule,
    MomentModule
  ]
})
export class ScoresPageModule {
}
