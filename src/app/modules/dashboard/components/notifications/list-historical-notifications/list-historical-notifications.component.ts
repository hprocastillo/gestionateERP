import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Company} from "../../../interfaces/company";
import firebase from "firebase";
import {Subject} from "rxjs";
import {Request} from "../../../interfaces/request";
import {ActivatedRoute} from "@angular/router";
import {EmployeeService} from "../../../../rrhh/services/employee.service";
import {RequestsService} from "../../../services/requests.service";
import {takeUntil} from "rxjs/operators";
import User = firebase.User;

@Component({
  selector: 'app-list-historical-notifications',
  templateUrl: './list-historical-notifications.component.html',
  styleUrls: ['./list-historical-notifications.component.scss']
})
export class ListHistoricalNotificationsComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() user = {} as User;
  @Input() company = {} as Company;

  //Pagination
  page: number = 1;
  pageSize: number = 5;

  //Results
  listRequests: Request[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeSvc: EmployeeService,
    private requestSvc: RequestsService) {
  }

  ngOnInit(): void {
    if (this.company.id) {
      this.requestSvc.getRequestsHistoricalJoin(this.company.id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Request[]) => {
          this.listRequests = res;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
