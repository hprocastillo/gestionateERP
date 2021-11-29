import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

//Services
import {EmployeeService} from "../../../services/employee.service";

//Interfaces
import {EmployeeTypes} from "../../../interfaces/employee";

@Component({
  selector: 'app-employees-type-by-id',
  templateUrl: './employees-type-by-id.component.html',
  styleUrls: ['./employees-type-by-id.component.scss']
})

export class EmployeesTypeByIdComponent implements OnChanges, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs amd Outputs
  @Input() employeeTypeId: string | any;

  //Results
  employeeType = {} as EmployeeTypes;

  constructor(private employeeSvc: EmployeeService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
