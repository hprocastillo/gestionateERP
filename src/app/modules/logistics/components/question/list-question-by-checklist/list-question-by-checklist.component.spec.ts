import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuestionByChecklistComponent } from './list-question-by-checklist.component';

describe('ListQuestionByChecklistComponent', () => {
  let component: ListQuestionByChecklistComponent;
  let fixture: ComponentFixture<ListQuestionByChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListQuestionByChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListQuestionByChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
