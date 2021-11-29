import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Company} from "../../../../dashboard/interfaces/company";
import firebase from "firebase";
import {Subject} from "rxjs";
import {EmployeeTypes} from "../../../interfaces/employee";
import {EmployeeService} from "../../../services/employee.service";
import {takeUntil} from "rxjs/operators";
import User = firebase.User;

@Component({
  selector: 'app-edit-employee-type',
  templateUrl: './edit-employee-type.component.html',
  styleUrls: ['./edit-employee-type.component.scss']
})
export class EditEmployeeTypeComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() user = {} as User;
  @Input() company = {} as Company;
  @Input() employeeTypeId: string | any;
  @Output() cancel = new EventEmitter<boolean>();

  //Results
  employeeType = {} as EmployeeTypes;

  constructor(private employeeSvc: EmployeeService) {
  }

  ngOnInit(): void {
    if (this.employeeTypeId) {
      this.employeeSvc.getEmployeesTypesById(this.employeeTypeId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.employeeType = res;
        }
      );
    }
  }

  getEdit() {
    this.employeeType.description = this.employeeType.description.toUpperCase();
    this.employeeSvc.updateEmployeeType(this.employeeType, this.employeeTypeId).then(r => console.log(r));
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
