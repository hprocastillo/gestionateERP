import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Company} from "../../../../dashboard/interfaces/company";
import firebase from "firebase";
import {Subject} from "rxjs";
import {Verification} from "../../../interfaces/checklist";
import {ChecklistService} from "../../../services/checklist.service";
import {takeUntil} from "rxjs/operators";
import * as XLSX from "xlsx";
import User = firebase.User;

@Component({
  selector: 'app-list-verifications',
  templateUrl: './list-verifications.component.html',
  styleUrls: ['./list-verifications.component.scss']
})
export class ListVerificationsComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() user = {} as User;
  @Input() company = {} as Company;
  @Output() view = new EventEmitter<any>();

  //Pagination
  page: number = 1;
  pageSize: number = 5;

  //Results
  listVerifications: Verification[] = [];

  //Variables
  today = new Date();
  fileName = 'Listado-Checklist-Usuarios.xlsx';

  constructor(private checklistSvc: ChecklistService) {
  }

  ngOnInit(): void {
    if (this.company.id) {
      this.checklistSvc.getVerifications(this.company.id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Verification[]) => {
          this.listVerifications = res;
        }
      );
    }
  }

  onView(verificationId: any) {
    this.view.emit(verificationId);
  }

  export(): void {
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
