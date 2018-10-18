import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material';

import { MainPageComponent } from './main-page.component';
import { UserService } from '../../../services/user.service';
import { instance, mock } from 'ts-mockito';

@Component({selector: 'app-footer', template: ''})
class FooterStubComponent {
}

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainPageComponent, FooterStubComponent],
      imports: [MatIconModule],
      providers: [
        {provide: UserService, useValue: instance(mock(UserService))}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
