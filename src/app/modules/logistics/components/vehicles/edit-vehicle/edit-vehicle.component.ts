import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import firebase from "firebase";
import {takeUntil} from "rxjs/operators";

//Services
import {EmployeeService} from "../../../../rrhh/services/employee.service";
import {VehicleService} from "../../../services/vehicle.service";

//Interfaces
import {Company} from "../../../../dashboard/interfaces/company";
import {Brand, Vehicle} from "../../../interfaces/vehicle";
import {Employee, EmployeeTypes} from "../../../../rrhh/interfaces/employee";
import User = firebase.User;

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss']
})

export class EditVehicleComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() editVehicle: string | any;
  @Input() user = {} as User;
  @Input() company = {} as Company;
  @Output() cancel = new EventEmitter<boolean>();

  //Results
  vehicle = {} as Vehicle;
  listEmployees: Employee[] = [];
  listEmployeesTypes: EmployeeTypes[] = [];
  listBrands: Brand[] = [];

  //Variables
  today = new Date();

  constructor(
    private employeeSvc: EmployeeService,
    private vehicleSvc: VehicleService) {
  }

  ngOnInit(): void {
    if (this.editVehicle) {
      this.vehicleSvc.getVehicleById(this.editVehicle).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.vehicle = res;
        }
      );
    }
    if (this.company.id) {
      this.employeeSvc.getEmployeesTypes(this.company.id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: EmployeeTypes[]) => {
          this.listEmployeesTypes = res;
          this.listEmployeesTypes = this.listEmployeesTypes.filter(item => {
            return item.description === 'CONDUCTOR';
          });
          this.employeeSvc.getEmployeesByEmployeeType(this.company.id, this.listEmployeesTypes[0].id).pipe(
            takeUntil(this.unsubscribe$)
          ).subscribe(
            (res: Employee[]) => {
              this.listEmployees = res;
            }
          );
        }
      );
      this.vehicleSvc.getBrands(this.company.id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Brand[]) => {
          this.listBrands = res;
        }
      );
    }
  }

  getEdit(user: User, editVehicle: string) {
    this.vehicle.description = this.vehicle.description.toUpperCase();
    this.vehicle.badge = this.vehicle.badge.toUpperCase();
    this.vehicle.updatedBy = user.uid;
    // @ts-ignore
    this.vehicle.updatedAt = this.today;
    this.vehicleSvc.updateVehicle(this.vehicle, editVehicle).then();
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
