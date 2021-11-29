import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmployeeTypeComponent } from './new-employee-type.component';

describe('NewEmployeeTypeComponent', () => {
  let component: NewEmployeeTypeComponent;
  let fixture: ComponentFixture<NewEmployeeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEmployeeTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEmployeeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
