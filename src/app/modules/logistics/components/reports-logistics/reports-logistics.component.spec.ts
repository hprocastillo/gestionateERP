import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsLogisticsComponent } from './reports-logistics.component';

describe('ReportsLogisticsComponent', () => {
  let component: ReportsLogisticsComponent;
  let fixture: ComponentFixture<ReportsLogisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsLogisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsLogisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
