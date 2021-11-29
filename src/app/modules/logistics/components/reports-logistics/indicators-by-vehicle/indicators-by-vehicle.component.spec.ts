import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorsByVehicleComponent } from './indicators-by-vehicle.component';

describe('IndicatorsByVehicleComponent', () => {
  let component: IndicatorsByVehicleComponent;
  let fixture: ComponentFixture<IndicatorsByVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicatorsByVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorsByVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
