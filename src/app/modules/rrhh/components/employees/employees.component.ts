import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Subject} from "rxjs";
import {Company} from "../../../dashboard/interfaces/company";
import {takeUntil} from "rxjs/operators";
import {CompanyService} from "../../../dashboard/services/company.service";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //INITIAL TAB
  active = 1;

  //Results
  listCompanies: Company[] = [];

  //Pages
  pageListEmployees: boolean = true;
  pageNewEmployee: boolean = false;
  pageEditEmployee: boolean = false;

  pageListEmployeesTypes: boolean = true;
  pageNewEmployeeTypes: boolean = false;
  pageEditEmployeeTypes: boolean = false;

  //Variables
  userId: string | any;
  editEmployee: string | any;
  editEmployeeType: string | any;

  constructor(
    public authSvc: AuthService,
    private activatedRoute: ActivatedRoute,
    private companySvc: CompanyService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.userId = params.userId;

        if(this.userId){
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

  //SHOW PAGES EMPLOYEES
  showListEmployees() {
    this.pageListEmployees = true;
    this.pageNewEmployee = false;
    this.pageEditEmployee = false;
  }

  showNewEmployee() {
    this.pageListEmployees = false;
    this.pageNewEmployee = true;
    this.pageEditEmployee = false;
  }

  showEditEmployee() {
    this.pageListEmployees = false;
    this.pageNewEmployee = false;
    this.pageEditEmployee = true;
  }

  getEditEmployee(event: any) {
    this.editEmployee = event;
    this.showEditEmployee();
  }

  //SHOW PAGES EMPLOYEES TYPES
  showListEmployeesTypes() {
    this.pageListEmployeesTypes = true;
    this.pageNewEmployeeTypes = false;
    this.pageEditEmployeeTypes = false;
  }

  showNewEmployeeTypes() {
    this.pageListEmployeesTypes = false;
    this.pageNewEmployeeTypes = true;
    this.pageEditEmployeeTypes = false;
  }

  showEditEmployeeTypes() {
    this.pageListEmployeesTypes = false;
    this.pageNewEmployeeTypes = false;
    this.pageEditEmployeeTypes = true;
  }

  getEditEmployeeTypes(event: any) {
    this.editEmployeeType = event;
    this.showEditEmployeeTypes();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
