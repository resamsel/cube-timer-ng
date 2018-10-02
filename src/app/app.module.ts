import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainPageModule} from './modules/pages/main-page/main-page.module';
import {SidenavModule} from './modules/nav/sidenav/sidenav.module';
import {PuzzlesPageModule} from './modules/pages/puzzles-page/puzzles-page.module';
import {ScoresPageModule} from './modules/pages/scores-page/scores-page.module';
import {SettingsPageModule} from './modules/pages/settings-page/settings-page.module';
import {TimerPageModule} from './modules/pages/timer-page/timer-page.module';
import {UserService} from './services/user.service';
import {NotFoundPageModule} from "./modules/pages/not-found-page/not-found-page.module";

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
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
