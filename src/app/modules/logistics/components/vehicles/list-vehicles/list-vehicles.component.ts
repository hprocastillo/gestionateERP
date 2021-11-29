import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import firebase from "firebase";
import * as XLSX from "xlsx";

//Services
import {VehicleService} from "../../../services/vehicle.service";

//Interfaces
import {Vehicle} from "../../../interfaces/vehicle";
import {Company} from "../../../../dashboard/interfaces/company";
import User = firebase.User;


@Component({
  selector: 'app-list-vehicles',
  templateUrl: './list-vehicles.component.html',
  styleUrls: ['./list-vehicles.component.scss']
})
export class ListVehiclesComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() user = {} as User;
  @Input() company = {} as Company;
  @Output() add = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<any>();

  //Pagination
  page: number = 1;
  pageSize: number = 5;

  //Results
  listVehicles: Vehicle[] = [];

  //Variables
  today = new Date();
  fileName = 'Listado-Vehiculos.xlsx';

  constructor(private vehicleSvc: VehicleService) {
  }

  ngOnInit(): void {
    if (this.company.id) {
      this.vehicleSvc.getVehicles(this.company.id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Vehicle[]) => {
          this.listVehicles = res;
        }
      );
    }
  }

  getPrint() {
    window.print();
  }

  getExport(): void {
    let element = document.getElementById('exportExcel');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    XLSX.writeFile(wb, this.fileName);
  }

  getNew(event: any) {
    this.add.emit(event.value);
  }

  getDelete(vehicle: Vehicle) {
    if (confirm("Desea eliminar el vehiculo: " + vehicle.description + "?")) {
      this.vehicleSvc.deleteVehicle(vehicle.id).then(r => console.log(r));
    }
  }

  getEdit(vehicleId: any) {
    this.edit.emit(vehicleId);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
