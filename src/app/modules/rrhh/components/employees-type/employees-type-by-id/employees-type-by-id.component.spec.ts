import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesTypeByIdComponent } from './employees-type-by-id.component';

describe('EmployeesTypeByIdComponent', () => {
  let component: EmployeesTypeByIdComponent;
  let fixture: ComponentFixture<EmployeesTypeByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesTypeByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesTypeByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
