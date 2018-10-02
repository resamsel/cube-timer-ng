import {Component, OnInit, Type} from '@angular/core';
import {Page} from '../../shared/page.interface';
import {Route} from '@angular/router';

export class SettingsPage implements Page {
  constructor(private component: Type<any>,
              public id: string = 'settings',
              public name: string = 'Settings',
              public icon: string = 'settings',
              public route: Route = {
                path: 'settings'
              }) {
    this.route.component = this.component;
  }
}

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {
  public static page: SettingsPage = new SettingsPage(SettingsPageComponent);

  constructor() { }

  ngOnInit() {
  }

}
