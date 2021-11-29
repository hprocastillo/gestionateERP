import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorsByVehicleDailyComponent } from './indicators-by-vehicle-daily.component';

describe('IndicatorsByVehicleDailyComponent', () => {
  let component: IndicatorsByVehicleDailyComponent;
  let fixture: ComponentFixture<IndicatorsByVehicleDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicatorsByVehicleDailyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorsByVehicleDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
