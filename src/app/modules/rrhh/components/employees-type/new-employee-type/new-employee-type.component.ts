import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Company} from "../../../../dashboard/interfaces/company";
import firebase from "firebase";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmployeeService} from "../../../services/employee.service";
import User = firebase.User;

@Component({
  selector: 'app-new-employee-type',
  templateUrl: './new-employee-type.component.html',
  styleUrls: ['./new-employee-type.component.scss']
})
export class NewEmployeeTypeComponent {
  //Inputs and Outputs
  @Input() user = {} as User;
  @Input() company = {} as Company;
  @Output() cancel = new EventEmitter<boolean>();

  //New Form
  newForm: FormGroup;

  //Variables
  today = new Date();

  constructor(
    private fb: FormBuilder,
    private employeeSvc: EmployeeService) {
    this.newForm = this.fb.group({
      description: [''],
      securityModule: [''],
      employeeModule: [''],
      logisticsModule: [''],
      configModule: [''],
    });
  }

  getSave(user: User, company: Company) {
    if (this.newForm.valid) {
      const employeeType = this.newForm.value;
      const employeeTypeId = employeeType?.id || null;
      employeeType.description = employeeType.description.toUpperCase();
      employeeType.companyId = company.id;
      employeeType.createdBy = user.uid;
      employeeType.createdAt = this.today;
      this.employeeSvc.saveEmployeeType(employeeType, employeeTypeId).then(r => console.log(r)).catch(err => console.log(err));
      this.newForm.reset();
      this.cancel.emit(false);
    }
  }

  getCancel() {
    this.cancel.emit(false);
  }
}
