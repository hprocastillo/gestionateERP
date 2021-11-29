import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesSchedulesComponent } from './employees-schedules.component';

describe('EmployeesSchedulesComponent', () => {
  let component: EmployeesSchedulesComponent;
  let fixture: ComponentFixture<EmployeesSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesSchedulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
