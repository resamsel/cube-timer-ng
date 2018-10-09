import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';
import { instance, mock } from 'ts-mockito';
import { SettingsService, SettingsState } from '../../../services/settings.service';
import { SidenavComponent } from '../../nav/sidenav/sidenav.component';

import { SettingsPageComponent } from './settings-page.component';

@Component({selector: 'app-sidenav', template: ''})
class SidenavStubComponent {
  @Input() activePage: string;
}

@Component({selector: 'app-navbar', template: ''})
class NavbarStubComponent {
  @Input() public sidenav: SidenavComponent;
  @Input() public page: string;
}

@Component({selector: 'app-settings-form', template: ''})
class SettingsFormStubComponent {
  @Input() settings: SettingsState;
}

describe('SettingsPageComponent', () => {
  let component: SettingsPageComponent;
  let fixture: ComponentFixture<SettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SettingsPageComponent,
        SidenavStubComponent,
        NavbarStubComponent,
        SettingsFormStubComponent
      ],
      imports: [
        MatCardModule
      ],
      providers: [
        {provide: SettingsService, useValue: instance(mock(SettingsService))}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
