import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleCreatorDialogComponent } from './puzzle-creator-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatButtonModule, MatDialogModule, MatDialogRef, MatFormFieldModule, MatInputModule } from '@angular/material';
import { instance, mock } from 'ts-mockito';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PuzzleNameValidator } from '../../../validators/puzzle-name.validator';

describe('PuzzleCreatorDialogComponent', () => {
  let component: PuzzleCreatorDialogComponent;
  let fixture: ComponentFixture<PuzzleCreatorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PuzzleCreatorDialogComponent],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: instance(mock(MatDialogRef))},
        {provide: MAT_DIALOG_DATA, useValue: []},
        {provide: PuzzleNameValidator, useValue: instance(mock(PuzzleNameValidator))}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleCreatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
