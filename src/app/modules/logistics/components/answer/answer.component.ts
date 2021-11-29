import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Subject} from "rxjs";
import {ChecklistService} from "../../services/checklist.service";
import {Answer} from "../../interfaces/checklist";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit, OnDestroy, OnChanges {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() questionId: string | any;
  @Input() categoryId: string | any;
  @Input() employeeId: string | any;
  @Input() checklistId: string | any;
  @Input() companyId: string | any;

  //Results
  answer: Answer[] = [];

  constructor(private checklistSvc: ChecklistService) {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.questionId) {
      this.checklistSvc.getAnswers(this.companyId, this.employeeId, this.checklistId, this.categoryId, this.questionId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Answer[]) => {
          this.answer = res;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
