import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesTypeComponent } from './employees-type.component';

describe('EmployeesTypeComponent', () => {
  let component: EmployeesTypeComponent;
  let fixture: ComponentFixture<EmployeesTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
