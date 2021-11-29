import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

//Services
import {EmployeeService} from "../../../services/employee.service";

//Interfaces
import {Employee} from "../../../interfaces/employee";

@Component({
  selector: 'app-employee-by-id',
  templateUrl: './employee-by-id.component.html',
  styleUrls: ['./employee-by-id.component.scss']
})

export class EmployeeByIdComponent implements OnDestroy, OnChanges {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() employeeId: string | any;

  //Results
  employee = {} as Employee;

  constructor(private employeeSvc: EmployeeService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.employeeId) {
      this.employeeSvc.getEmployeeById(this.employeeId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.employee = res;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
