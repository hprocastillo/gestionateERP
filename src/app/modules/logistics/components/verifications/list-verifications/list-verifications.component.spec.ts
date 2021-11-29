import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVerificationsComponent } from './list-verifications.component';

describe('ListVerificationsComponent', () => {
  let component: ListVerificationsComponent;
  let fixture: ComponentFixture<ListVerificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVerificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVerificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
