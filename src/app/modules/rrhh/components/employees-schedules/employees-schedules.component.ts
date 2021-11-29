import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {Company} from "../../../dashboard/interfaces/company";
import {AuthService} from "../../../auth/services/auth.service";
import {ActivatedRoute, Params} from "@angular/router";
import {CompanyService} from "../../../dashboard/services/company.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-employees-schedules',
  templateUrl: './employees-schedules.component.html',
  styleUrls: ['./employees-schedules.component.scss']
})
export class EmployeesSchedulesComponent implements OnInit {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Results
  listCompanies: Company[] = [];

  //Pages
  pageListSchedule: boolean = true;
  pageNewSchedule: boolean = false;
  pageEditSchedule: boolean = false;

  //Variables
  userId: string | any;
  editSchedule: string | any;

  constructor(
    public authSvc: AuthService,
    private activatedRoute: ActivatedRoute,
    private companySvc: CompanyService) {
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.userId = params.userId;

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

  showList() {
    this.pageListSchedule = true;
    this.pageNewSchedule = false;
    this.pageEditSchedule = false;
  }

  showNew() {
    this.pageListSchedule = false;
    this.pageNewSchedule = true;
    this.pageEditSchedule = false;
  }

  showEdit() {
    this.pageListSchedule = false;
    this.pageNewSchedule = false;
    this.pageEditSchedule = true;
  }

  getEdit(event: any) {
    this.editSchedule = event;
    this.showEdit();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
