import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import * as XLSX from "xlsx";
import firebase from "firebase";

//Service
import {VehicleService} from "../../../services/vehicle.service";

//Interface
import {Brand} from "../../../interfaces/vehicle";
import {Company} from "../../../../dashboard/interfaces/company";
import User = firebase.User;

@Component({
  selector: 'app-list-brands',
  templateUrl: './list-brands.component.html',
  styleUrls: ['./list-brands.component.scss']
})

export class ListBrandsComponent implements OnInit, OnDestroy {
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
  listBrands: Brand[] = [];

  //Variables
  fileName = 'Listado-Marcas.xlsx';

  constructor(private vehicleSvc: VehicleService) {
  }

  ngOnInit(): void {
    if (this.company.id) {
      this.vehicleSvc.getBrands(this.company.id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Brand[]) => {
          this.listBrands = res;
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

  getDelete(brand: Brand) {
    if (confirm("Desea eliminar la categoria: " + brand.brand + " ?")) {
      this.vehicleSvc.deleteBrand(brand.id).then();
    }
  }

  getEdit(id: any) {
    this.edit.emit(id);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
