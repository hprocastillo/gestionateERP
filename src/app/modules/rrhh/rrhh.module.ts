import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RrhhRoutingModule} from './rrhh-routing.module';
import {EmployeesComponent} from './components/employees/employees.component';
import {EmployeesTypeComponent} from './components/employees-type/employees-type.component';
import {EmployeesSchedulesComponent} from './components/employees-schedules/employees-schedules.component';
import {NewEmployeeComponent} from './components/employees/new-employee/new-employee.component';
import {ListEmployeesComponent} from './components/employees/list-employees/list-employees.component';
import {EditEmployeeComponent} from './components/employees/edit-employee/edit-employee.component';
import {DashboardModule} from "../dashboard/dashboard.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EmployeesTypeByIdComponent} from './components/employees-type/employees-type-by-id/employees-type-by-id.component';
import {NewEmployeeTypeComponent} from './components/employees-type/new-employee-type/new-employee-type.component';
import {EditEmployeeTypeComponent} from './components/employees-type/edit-employee-type/edit-employee-type.component';
import {ListEmployeesTypeComponent} from './components/employees-type/list-employees-type/list-employees-type.component';
import {NewScheduleComponent} from './components/employees-schedules/new-schedule/new-schedule.component';
import {EditScheduleComponent} from './components/employees-schedules/edit-schedule/edit-schedule.component';
import {ListScheduleComponent} from './components/employees-schedules/list-schedule/list-schedule.component';
import {EmployeeByIdComponent} from './components/employees/employee-by-id/employee-by-id.component';
import {NgbNavModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeesTypeComponent,
    EmployeesSchedulesComponent,
    NewEmployeeComponent,
    ListEmployeesComponent,
    EditEmployeeComponent,
    EmployeesTypeByIdComponent,
    NewEmployeeTypeComponent,
    EditEmployeeTypeComponent,
    ListEmployeesTypeComponent,
    NewScheduleComponent,
    EditScheduleComponent,
    ListScheduleComponent,
    EmployeeByIdComponent
  ],
  exports: [
    EmployeeByIdComponent
  ],
  imports: [
    CommonModule,
    RrhhRoutingModule,
    DashboardModule,
    ReactiveFormsModule,
    FormsModule,
    NgbNavModule,
    NgbPaginationModule
  ]
})
export class RrhhModule {
}
