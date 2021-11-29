import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import firebase from "firebase";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import * as XLSX from "xlsx";

//Services
import {EmployeeService} from "../../../services/employee.service";

//Interfaces
import {EmployeeTypes} from "../../../interfaces/employee";
import {Company} from "../../../../dashboard/interfaces/company";
import User = firebase.User;

@Component({
  selector: 'app-list-employees-type',
  templateUrl: './list-employees-type.component.html',
  styleUrls: ['./list-employees-type.component.scss']
})

export class ListEmployeesTypeComponent implements OnInit, OnDestroy {
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

  //Variables
  today = new Date();
  fileName = 'Listado-Tipos-Empleados.xlsx';

  //Results
  listEmployeesType: EmployeeTypes[] = [];

  constructor(private employeeSvc: EmployeeService) {
  }

  ngOnInit(): void {
    if (this.company.id) {
      this.employeeSvc.getEmployeesTypes(this.company.id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: EmployeeTypes[]) => {
          this.listEmployeesType = res;
        }
      );
    }
  }

  getNew(event: any) {
    this.add.emit(event.value);
  }

  getDelete(employeeType: EmployeeTypes) {
    if (confirm("Desea eliminar el Tipo de empleado: " + employeeType.description + "?")) {
      this.employeeSvc.deleteEmployeeType(employeeType.id).then(r => console.log(r));
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

  getEdit(employeeTypeId: any) {
    this.edit.emit(employeeTypeId);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
