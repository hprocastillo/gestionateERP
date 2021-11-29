import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorsByVehicleYearlyComponent } from './indicators-by-vehicle-yearly.component';

describe('IndicatorsByVehicleYearlyComponent', () => {
  let component: IndicatorsByVehicleYearlyComponent;
  let fixture: ComponentFixture<IndicatorsByVehicleYearlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicatorsByVehicleYearlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorsByVehicleYearlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
