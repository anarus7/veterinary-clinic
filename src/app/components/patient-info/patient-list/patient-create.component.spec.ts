import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCreateComponent } from './patient-create.component';

describe('PatientCreateComponent', () => {
  let component: PatientCreateComponent;
  let fixture: ComponentFixture<PatientCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
