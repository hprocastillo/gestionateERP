import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeesComponent} from "./components/employees/employees.component";
import {EmployeesTypeComponent} from "./components/employees-type/employees-type.component";
import {EmployeesSchedulesComponent} from "./components/employees-schedules/employees-schedules.component";
import {AuthGuard} from "../auth/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    canActivate:[AuthGuard],
    children: [
      {path: 'employees/:userId', component: EmployeesComponent},
      {path: 'employeesType/:userId', component: EmployeesTypeComponent},
      {path: 'employeesSchedule/:userId', component: EmployeesSchedulesComponent},
      {path: '**', redirectTo: 'employees/:userId'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RrhhRoutingModule {
}
