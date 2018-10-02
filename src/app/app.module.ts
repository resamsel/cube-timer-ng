import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageModule } from './modules/main-page/main-page.module';
import { SidenavModule } from './modules/nav/sidenav/sidenav.module';
import { PuzzlesPageModule } from './modules/puzzles-page/puzzles-page.module';
import { ScoresPageModule } from './modules/scores-page/scores-page.module';
import { SettingsPageModule } from './modules/settings-page/settings-page.module';
import { TimerPageModule } from './modules/timer-page/timer-page.module';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    SidenavModule,
    MainPageModule,
    TimerPageModule,
    ScoresPageModule,
    PuzzlesPageModule,
    SettingsPageModule,
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
