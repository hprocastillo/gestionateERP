import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryByIdComponent } from './category-by-id.component';

describe('CategoryByIdComponent', () => {
  let component: CategoryByIdComponent;
  let fixture: ComponentFixture<CategoryByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
