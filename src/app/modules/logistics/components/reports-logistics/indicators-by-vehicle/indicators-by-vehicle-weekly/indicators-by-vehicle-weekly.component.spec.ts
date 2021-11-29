import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorsByVehicleWeeklyComponent } from './indicators-by-vehicle-weekly.component';

describe('IndicatorsByVehicleWeeklyComponent', () => {
  let component: IndicatorsByVehicleWeeklyComponent;
  let fixture: ComponentFixture<IndicatorsByVehicleWeeklyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicatorsByVehicleWeeklyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorsByVehicleWeeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
