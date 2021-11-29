import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import firebase from "firebase";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {takeUntil} from "rxjs/operators";

//Services
import {EmployeeService} from "../../../../rrhh/services/employee.service";
import {VehicleService} from "../../../services/vehicle.service";

//Interfaces
import {Company} from "../../../../dashboard/interfaces/company";
import {Employee, EmployeeTypes} from "../../../../rrhh/interfaces/employee";
import {Brand} from "../../../interfaces/vehicle";
import User = firebase.User;

@Component({
  selector: 'app-new-vehicle',
  templateUrl: './new-vehicle.component.html',
  styleUrls: ['./new-vehicle.component.scss']
})

export class NewVehicleComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() user = {} as User;
  @Input() company = {} as Company;
  @Output() cancel = new EventEmitter<boolean>();

  //New Form
  newForm: FormGroup;

  //Results
  listEmployees: Employee[] = [];
  listEmployeesTypes: EmployeeTypes[] = [];
  listBrands: Brand[] = [];

  //Variables
  today = new Date();

  constructor(
    private fb: FormBuilder,
    private employeeSvc: EmployeeService,
    private vehicleSvc: VehicleService) {
    this.newForm = this.fb.group({
      description: ['', [Validators.required]],
      badge: ['', [Validators.required]],
      birthDay: ['', [Validators.required]],
      employeeId: ['', [Validators.required]],
      brandId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
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

  getSave(user: User, company: Company) {
    if (this.newForm.valid) {
      const vehicle = this.newForm.value;
      const vehicleId = vehicle?.id || null;
      vehicle.companyId = company.id;
      vehicle.description = vehicle.description.toUpperCase();
      vehicle.badge = vehicle.badge.toUpperCase();
      vehicle.createdBy = user.uid;
      vehicle.createdAt = this.today;
      this.vehicleSvc.saveVehicle(vehicle, vehicleId).then();
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
