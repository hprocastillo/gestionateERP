import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import firebase from "firebase";
import {takeUntil} from "rxjs/operators";

//Services
import {EmployeeService} from "../../../services/employee.service";

//Interfaces
import {Company} from "../../../../dashboard/interfaces/company";
import {Employee, EmployeeTypes} from "../../../interfaces/employee";
import User = firebase.User;

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() user = {} as User;
  @Input() company = {} as Company;
  @Input() employeeId: string | any;
  @Output() cancel = new EventEmitter<boolean>();

  //Results
  employee = {} as Employee;
  listEmployeeTypes: EmployeeTypes[] = [];

  //Variables
  today = new Date();

  constructor(private employeeSvc: EmployeeService) {
  }

  ngOnInit(): void {
    if (this.employeeId) {
      this.employeeSvc.getEmployeeById(this.employeeId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.employee = res;
        }
      );
    }
    if (this.company.id) {
      this.employeeSvc.getEmployeesTypes(this.company.id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: EmployeeTypes[]) => {
          this.listEmployeeTypes = res;
        }
      );
    }
  }

  getEdit(user: User, employeeId: string) {
    this.employee.name = this.employee.name.toUpperCase();
    this.employee.updatedBy = user.uid;
    // @ts-ignore
    this.employee.updatedAt = this.today;
    this.employeeSvc.updateEmployee(this.employee, employeeId).then(r => console.log(r));
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
