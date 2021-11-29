import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import firebase from "firebase";
import {Company} from "../../../interfaces/company";
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../../../rrhh/services/employee.service";
import {RequestsService} from "../../../services/requests.service";
import {takeUntil} from "rxjs/operators";
import {Request} from "../../../interfaces/request";
import {Employee} from "../../../../rrhh/interfaces/employee";
import User = firebase.User;

@Component({
  selector: 'app-list-current-notifications',
  templateUrl: './list-current-notifications.component.html',
  styleUrls: ['./list-current-notifications.component.scss']
})
export class ListCurrentNotificationsComponent implements OnInit, OnDestroy {
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

  //Variables
  today = new Date();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private employeeSvc: EmployeeService,
    private requestSvc: RequestsService) {
  }

  ngOnInit(): void {
    if (this.company.id) {
      this.requestSvc.getRequestsByJoin(this.company.id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Request[]) => {
          this.listRequests = res;
        }
      );
    }
  }

  agree(request: Request, user: User, company: Company) {
    if (confirm("Desea aceptar la solicitud de: " + request.userDisplayName + " ?")) {
      const employee = {} as Employee;
      const employeeId = employee?.id || null;
      employee.name = request.userDisplayName;
      employee.email = request.userEmail;
      // @ts-ignore
      employee.companyId = company.id;
      employee.createdBy = user.uid;
      // @ts-ignore
      employee.createdAt = this.today;
      request.status = "ACEPTADO";
      request.active = false;
      this.employeeSvc.saveEmployee(employee, employeeId).then();
      this.requestSvc.updateRequest(request, request.id).then();
      this.router.navigate(['rrhh/employees/', user.uid]).then();
    }
  }

  reject(request: Request, user: User) {
    if (confirm("Desea rechazar la solicitud de: " + request.userDisplayName + " ?")) {
      request.status = "RECHAZADO";
      request.active = false;
      request.createdBy = user.uid;
      // @ts-ignore
      request.updatedAt = this.today;
      this.requestSvc.updateRequest(request, request.id).then();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
