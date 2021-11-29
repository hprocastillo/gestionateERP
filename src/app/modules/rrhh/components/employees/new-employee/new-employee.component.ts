import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import firebase from "firebase";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

//Services
import {EmployeeService} from "../../../services/employee.service";

//Interfaces
import {EmployeeTypes} from "../../../interfaces/employee";
import {Company} from "../../../../dashboard/interfaces/company";
import User = firebase.User;

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() user = {} as User;
  @Input() company = {} as Company;
  @Output() cancel = new EventEmitter<boolean>();

  //New Form
  newForm: FormGroup;

  //Results
  listEmployeesTypes: EmployeeTypes[] = [];

  //Variables
  today = new Date();

  constructor(
    private fb: FormBuilder,
    private employeeSvc: EmployeeService) {
    this.newForm = this.fb.group({
      name: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      email: ['', [Validators.required]],
      employeeTypeId: ['', [Validators.required]],
      phone: [''],
      address: [''],
    });
  }

  ngOnInit(): void {
    if (this.company.id) {
      this.employeeSvc.getEmployeesTypes(this.company.id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: EmployeeTypes[]) => {
          this.listEmployeesTypes = res;
        }
      );
    }
  }

  getSave(user: User, company: Company) {
    if (this.newForm.valid) {
      const employee = this.newForm.value;
      const employeeId = employee?.id || null;
      employee.name = employee.name.toUpperCase();
      employee.companyId = company.id;
      employee.createdBy = user.uid;
      employee.createdAt = this.today;
      this.employeeSvc.saveEmployee(employee, employeeId).then(r => console.log(r));
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
