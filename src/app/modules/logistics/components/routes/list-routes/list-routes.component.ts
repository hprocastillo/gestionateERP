import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import firebase from "firebase";
import * as XLSX from "xlsx";

//Services
import {RouteService} from "../../../services/route.service";

//Interfaces
import {Route} from "../../../interfaces/route";
import {Company} from "../../../../dashboard/interfaces/company";
import User = firebase.User;

@Component({
  selector: 'app-list-routes',
  templateUrl: './list-routes.component.html',
  styleUrls: ['./list-routes.component.scss']
})

export class ListRoutesComponent implements OnInit, OnDestroy {
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
  listRoutes: Route[] = [];

  //Variables
  today = new Date();
  fileName = 'Listado-Rutas.xlsx';

  constructor(private routeSvc: RouteService) {
  }

  ngOnInit(): void {
    if (this.company.id) {
      this.routeSvc.getRoutes(this.company.id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Route[]) => {
          this.listRoutes = res;
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

  getDelete(route: Route) {
    if (confirm("Desea eliminar la Ruta: " + route.description + " ?")) {
      this.routeSvc.deleteRoute(route.id).then(r => console.log(r));
    }
  }

  getEdit(routeId: any) {
    this.edit.emit(routeId);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
