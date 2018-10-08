import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';

import { NavbarComponent } from './navbar.component';

@Component({selector: 'app-auth', template: ''})
export class AuthStubComponent {
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavbarComponent,
        AuthStubComponent
      ],
      imports: [
        MatIconModule,
        MatMenuModule,
        MatToolbarModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
