import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmployeesTypeComponent } from './list-employees-type.component';

describe('ListEmployeesTypeComponent', () => {
  let component: ListEmployeesTypeComponent;
  let fixture: ComponentFixture<ListEmployeesTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEmployeesTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmployeesTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
