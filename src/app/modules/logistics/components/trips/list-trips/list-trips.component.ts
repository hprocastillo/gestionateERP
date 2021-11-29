import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import firebase from "firebase";
import {takeUntil} from "rxjs/operators";
import * as XLSX from 'xlsx';

//Services
import {RouteService} from "../../../services/route.service";

//Interfaces
import {Trip} from "../../../interfaces/route";
import {Company} from "../../../../dashboard/interfaces/company";
import User = firebase.User;

@Component({
  selector: 'app-list-trips',
  templateUrl: './list-trips.component.html',
  styleUrls: ['./list-trips.component.scss']
})
export class ListTripsComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() user = {} as User;
  @Input() company = {} as Company;

  //Results
  listTrips: Trip[] = [];

  //Pagination
  page: number = 1;
  pageSize: number = 5;

  //Variables
  fileName = 'Listado_Viajes.xlsx';

  constructor(private routeSvc: RouteService) {
  }

  ngOnInit(): void {
    if (this.company.id) {
      this.routeSvc.getTrips(this.company.id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Trip[]) => {
          this.listTrips = res;
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
