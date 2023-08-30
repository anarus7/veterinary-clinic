import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOwnerComponent } from './add-edit-owner.component';

describe('AddEditOwnerComponent', () => {
  let component: AddEditOwnerComponent;
  let fixture: ComponentFixture<AddEditOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
