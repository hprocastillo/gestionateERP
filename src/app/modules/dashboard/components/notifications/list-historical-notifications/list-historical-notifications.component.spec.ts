import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHistoricalNotificationsComponent } from './list-historical-notifications.component';

describe('ListHistoricalNotificationsComponent', () => {
  let component: ListHistoricalNotificationsComponent;
  let fixture: ComponentFixture<ListHistoricalNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHistoricalNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHistoricalNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
