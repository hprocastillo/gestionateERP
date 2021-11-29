import {Component, OnDestroy, OnInit} from '@angular/core';
import {Company} from "../../../dashboard/interfaces/company";
import {Subject} from "rxjs";
import {AuthService} from "../../../auth/services/auth.service";
import {ActivatedRoute, Params} from "@angular/router";
import {CompanyService} from "../../../dashboard/services/company.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Results
  listCompanies: Company[] = [];

  //Variables
  userId: string | any;
  editCategory: string | any;
  editChecklist: string | any;
  editQuestion: string | any;
  verificationId: string | any;

  //INITIAL TAB
  active = 1;

  //PAGES
  listPageQuestion: boolean = true;
  newPageQuestion: boolean = false;
  editPageQuestion: boolean = false;

  listPageCategory: boolean = true;
  newPageCategory: boolean = false;
  editPageCategory: boolean = false;

  listPageChecklist: boolean = true;
  newPageChecklist: boolean = false;
  editPageChecklist: boolean = false;

  listPageVerifications: boolean = true;
  viewPageVerification: boolean = false;

  constructor(
    public authSvc: AuthService,
    private activatedRoute: ActivatedRoute,
    private companySvc: CompanyService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.userId = params.id;

        if (this.userId) {
          this.companySvc.getCompanyByUserId(this.userId).pipe(
            takeUntil(this.unsubscribe$)
          ).subscribe(
            (res: Company[]) => {
              this.listCompanies = res;
            }
          );
        }
      }
    )
  }

  //PAGE CATEGORY
  showListPageCategory() {
    this.listPageCategory = true;
    this.newPageCategory = false;
    this.editPageCategory = false;
  }

  showNewPageCategory() {
    this.listPageCategory = false;
    this.newPageCategory = true;
    this.editPageCategory = false;
  }

  showEditPageCategory() {
    this.listPageCategory = false;
    this.newPageCategory = false;
    this.editPageCategory = true;
  }

  getEditCategory(event: any) {
    this.editCategory = event;
    this.showEditPageCategory();
  }

  //PAGE CHECKLIST
  showListPageChecklist() {
    this.listPageChecklist = true;
    this.newPageChecklist = false;
    this.editPageChecklist = false;
  }

  showNewPageChecklist() {
    this.listPageChecklist = false;
    this.newPageChecklist = true;
    this.editPageChecklist = false;
  }

  showEditPageChecklist() {
    this.listPageChecklist = false;
    this.newPageChecklist = false;
    this.editPageChecklist = true;
  }

  getEditChecklist(event: any) {
    this.editChecklist = event;
    this.showEditPageChecklist();
  }

  //PAGE QUESTION
  showListPageQuestion() {
    this.listPageQuestion = true;
    this.newPageQuestion = false;
    this.editPageQuestion = false;
  }

  showNewPageQuestion() {
    this.listPageQuestion = false;
    this.newPageQuestion = true;
    this.editPageQuestion = false;
  }

  showEditPageQuestion() {
    this.listPageQuestion = false;
    this.newPageQuestion = false;
    this.editPageQuestion = true;
  }

  getEditQuestion(event: any) {
    this.editQuestion = event;
    this.showEditPageQuestion();
  }

  //PAGE VERIFICATION
  showListPageVerifications() {
    this.listPageVerifications = true;
    this.viewPageVerification = false;
  }

  showViewPageVerification() {
    this.listPageVerifications = false;
    this.viewPageVerification = true;
  }

  getViewVerification(event: any) {
    this.verificationId = event;
    this.showViewPageVerification();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
