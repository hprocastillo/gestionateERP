import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCurrentNotificationsComponent } from './list-current-notifications.component';

describe('ListCurrentNotificationsComponent', () => {
  let component: ListCurrentNotificationsComponent;
  let fixture: ComponentFixture<ListCurrentNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCurrentNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCurrentNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
