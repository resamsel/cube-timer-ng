import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers } from './app-reducers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavModule } from './modules/nav/sidenav/sidenav.module';
import { MainPageModule } from './modules/pages/main-page/main-page.module';
import { NotFoundPageModule } from './modules/pages/not-found-page/not-found-page.module';
import { PuzzlesPageModule } from './modules/pages/puzzles-page/puzzles-page.module';
import { ScoresPageModule } from './modules/pages/scores-page/scores-page.module';
import { SettingsPageModule } from './modules/pages/settings-page/settings-page.module';
import { TimerPageModule } from './modules/pages/timer-page/timer-page.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SidenavModule,
    MainPageModule,
    TimerPageModule,
    ScoresPageModule,
    PuzzlesPageModule,
    SettingsPageModule,
    NotFoundPageModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
