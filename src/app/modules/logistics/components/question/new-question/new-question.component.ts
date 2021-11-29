import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import firebase from "firebase";
import {takeUntil} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

//Services
import {ChecklistService} from "../../../services/checklist.service";

//Interfaces
import {Company} from "../../../../dashboard/interfaces/company";
import {Category, Checklist} from "../../../interfaces/checklist";
import User = firebase.User;

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})

export class NewQuestionComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() user = {} as User;
  @Input() company = {} as Company;
  @Output() cancel = new EventEmitter<boolean>();

  //Variables
  today = new Date();

  //New Form
  newForm: FormGroup;

  //Results
  listChecklist: Checklist[] = [];
  listCategories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private checklistSvc: ChecklistService) {
    this.newForm = this.fb.group({
      description: ['', [Validators.required]],
      checklistId: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
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

  getSave(user: User, company: Company) {
    if (this.newForm.valid) {
      const question = this.newForm.value;
      const questionId = question?.id || null;
      question.description = question.description.toUpperCase();
      question.companyId = company.id;
      question.createdBy = user.uid;
      question.createdAt = this.today;
      this.checklistSvc.saveQuestion(question, questionId).then();
      this.newForm.reset();
      this.cancel.emit(false);
    }
  }

  getCancel() {
    this.cancel.emit(false);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
