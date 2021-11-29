import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import firebase from "firebase";
import {takeUntil} from "rxjs/operators";
import * as XLSX from "xlsx";

//Services
import {ChecklistService} from "../../../services/checklist.service";

//Interfaces
import {Company} from "../../../../dashboard/interfaces/company";
import {Category} from "../../../interfaces/checklist";
import User = firebase.User;

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})

export class ListCategoriesComponent implements OnInit, OnDestroy {
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
  listCategories: Category[] = [];

  //Variables
  fileName = 'Listado-Categorias.xlsx';

  constructor(private checklistSvc: ChecklistService) {
  }

  ngOnInit(): void {
    if (this.company.id) {
      this.checklistSvc.getCategories(this.company.id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Category[]) => {
          this.listCategories = res;
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

  getDelete(category: Category) {
    if (confirm("Desea eliminar la categoria: " + category.name + " ?")) {
      this.checklistSvc.deleteCategory(category.id).then();
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
