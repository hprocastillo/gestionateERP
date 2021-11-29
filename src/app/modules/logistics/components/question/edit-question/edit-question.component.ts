import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import firebase from "firebase";
import {takeUntil} from "rxjs/operators";

//Services
import {ChecklistService} from "../../../services/checklist.service";

//Interfaces
import {Category, Checklist, Question} from "../../../interfaces/checklist";
import {Company} from "../../../../dashboard/interfaces/company";
import User = firebase.User;

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})

export class EditQuestionComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() editQuestion: string | any;
  @Input() user = {} as User;
  @Input() company = {} as Company;
  @Output() cancel = new EventEmitter<boolean>();

  //Results
  question = {} as Question;

  //Variables
  today = new Date();

  //Results
  listChecklist: Checklist[] = [];
  listCategories: Category[] = [];

  constructor(private checklistSvc: ChecklistService) {
  }

  ngOnInit(): void {
    if (this.editQuestion) {
      this.checklistSvc.getQuestionById(this.editQuestion).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.question = res;
        }
      );
    }
    if (this.company.id) {
      // Get checklist
      this.checklistSvc.getChecklistsActive(this.company.id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Checklist[]) => {
          this.listChecklist = res;
        }
      );
      // Get categories
      this.checklistSvc.getCategories(this.company.id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Category[]) => {
          this.listCategories = res;
        }
      );
    }
  }

  getEdit(user: User, editQuestion: string) {
    this.question.description = this.question.description.toUpperCase();
    this.question.updatedBy = user.uid;
    // @ts-ignore
    this.question.updatedAt = this.today;
    this.checklistSvc.updateQuestion(this.question, editQuestion).then(r => console.log(r));
    this.cancel.emit(false);
  }

  getCancel() {
    this.cancel.emit(false);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
