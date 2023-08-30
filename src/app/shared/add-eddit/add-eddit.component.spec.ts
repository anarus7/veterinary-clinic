import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEdditComponent } from './add-eddit.component';

describe('AddEdditComponent', () => {
  let component: AddEdditComponent;
  let fixture: ComponentFixture<AddEdditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEdditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEdditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
