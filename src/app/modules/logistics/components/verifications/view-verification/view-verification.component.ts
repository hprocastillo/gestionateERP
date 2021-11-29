import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Company} from "../../../../dashboard/interfaces/company";
import firebase from "firebase";
import {Subject} from "rxjs";
import {ChecklistService} from "../../../services/checklist.service";
import {takeUntil} from "rxjs/operators";
import {Category, Checklist, Question, Verification} from "../../../interfaces/checklist";
import User = firebase.User;

@Component({
  selector: 'app-view-verification',
  templateUrl: './view-verification.component.html',
  styleUrls: ['./view-verification.component.scss']
})
export class ViewVerificationComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() user = {} as User;
  @Input() company = {} as Company;
  @Input() verificationId: string | any;
  @Output() back = new EventEmitter<boolean>();

  //Results
  verification = {} as Verification;
  checklist = {} as Checklist;
  listQuestions: Question[] = [];
  listCategories: Category[] = [];


  constructor(
    private checklistSvc: ChecklistService) {
  }

  ngOnInit(): void {
    if (this.verificationId) {
      this.checklistSvc.getVerificationById(this.verificationId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.verification = res;

          if (this.company.id) {
            //get list questions
            this.checklistSvc.getQuestionsByChecklist(this.company.id, this.verification.checklistId).pipe(
              takeUntil(this.unsubscribe$)
            ).subscribe(
              (res: Question[]) => {
                this.listQuestions = res;
              }
            );

            //get checklist
            this.checklistSvc.getChecklistById(this.verification.checklistId).pipe(
              takeUntil(this.unsubscribe$)
            ).subscribe(
              (res: any) => {
                this.checklist = res;
              }
            );
          }

        }
      );
    }
  }

  getPrint() {
    window.print();
  }

  getBack() {
    this.back.emit(true);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
