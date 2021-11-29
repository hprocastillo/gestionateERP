import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import * as XLSX from "xlsx";
import firebase from "firebase";
import {takeUntil} from "rxjs/operators";

//Services
import {RouteService} from "../../../services/route.service";

//Interfaces
import {Company} from "../../../../dashboard/interfaces/company";
import {Cities} from "../../../interfaces/route";
import User = firebase.User;

@Component({
  selector: 'app-list-cities',
  templateUrl: './list-cities.component.html',
  styleUrls: ['./list-cities.component.scss']
})

export class ListCitiesComponent implements OnInit, OnDestroy {
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
  listCities: Cities[] = [];

  //Variables
  fileName = 'Listado-Ciudades.xlsx';

  constructor(private routeSvc: RouteService) {
  }

  ngOnInit(): void {
    if (this.company.id) {
      this.routeSvc.getCities(this.company.id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Cities[]) => {
          this.listCities = res;
        }
      );
    }
  }

  getNew(event: any) {
    this.add.emit(event.value);
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

  getDelete(city: Cities) {
    if (confirm("Desea eliminar la ciudad: " + city.name + " ?")) {
      this.routeSvc.deleteCity(city.id).then();
    }
  }

  getEdit(cityId: any) {
    this.edit.emit(cityId);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
