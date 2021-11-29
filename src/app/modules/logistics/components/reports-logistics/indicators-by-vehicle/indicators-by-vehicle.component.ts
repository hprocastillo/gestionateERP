import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import firebase from "firebase";
import {Company} from "../../../../dashboard/interfaces/company";
import * as XLSX from "xlsx";
import {Subject} from "rxjs";
import {EmployeeService} from "../../../../rrhh/services/employee.service";
import User = firebase.User;

@Component({
  selector: 'app-indicators-by-vehicle',
  templateUrl: './indicators-by-vehicle.component.html',
  styleUrls: ['./indicators-by-vehicle.component.scss']
})
export class IndicatorsByVehicleComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  @Input() user = {} as User;
  @Input() company = {} as Company;

  //INITIAL TAB
  active = 1;

  //Variables
  today = new Date();

  constructor() {
  }

  ngOnInit(): void {
    // let year: number = this.today.getFullYear();
    // let month: string;
    // let day: string;
    // let dateString: string;
    //
    // if ((this.today.getMonth() + 1) < 10) {
    //   month = '0' + (this.today.getMonth());
    //
    // } else {
    //   month = (this.today.getMonth() + 1).toString();
    // }
    //
    // if (this.today.getDate() < 10) {
    //   day = '0' + this.today.getDate();
    //
    // } else {
    //   day = this.today.getDate().toString();
    // }
    //
    // dateString = month + '-' + day + '-' + year;

  }

  // getVehicle(vehicle: Vehicle) {
  //   this.employeeId = vehicle.employeeId;
  //   this.companyId = vehicle.companyId;
  // }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
