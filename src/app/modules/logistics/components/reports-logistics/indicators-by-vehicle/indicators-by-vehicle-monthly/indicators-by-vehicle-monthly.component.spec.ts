import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorsByVehicleMonthlyComponent } from './indicators-by-vehicle-monthly.component';

describe('IndicatorsByVehicleMonthlyComponent', () => {
  let component: IndicatorsByVehicleMonthlyComponent;
  let fixture: ComponentFixture<IndicatorsByVehicleMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicatorsByVehicleMonthlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorsByVehicleMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
