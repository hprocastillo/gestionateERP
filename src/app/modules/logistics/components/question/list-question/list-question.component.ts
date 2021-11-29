import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {Company} from "../../../../dashboard/interfaces/company";
import firebase from "firebase";
import {Checklist, Question} from "../../../interfaces/checklist";
import {ChecklistService} from "../../../services/checklist.service";
import {takeUntil} from "rxjs/operators";
import * as XLSX from "xlsx";
import User = firebase.User;

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.scss']
})
export class ListQuestionComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() user = {} as User;
  @Input() company = {} as Company;
  @Output() add = new EventEmitter<boolean>();
  @Output() back = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<any>();

  //Results
  listChecklist: Checklist[] = [];
  listQuestions: Question[] = [];

  //Checklist Selected
  checklistSelected: string | any;

  //Pagination
  page: number = 1;
  pageSize: number = 5;

  constructor(private checklistSvc: ChecklistService) {
  }

  ngOnInit(): void {
    if (this.company.id) {
      this.checklistSvc.getChecklistsActive(this.company.id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Checklist[]) => {
          this.listChecklist = res;
        }
      );
      this.checklistSvc.getQuestions(this.company.id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Question[]) => {
          this.listQuestions = res;
        }
      );
    }
  }

  getPrint() {
    window.print();
  }

  getBack() {
    this.back.emit(true);
  }

  getSelectedChecklist(event: any) {
    this.checklistSelected = event.value;
  }

  getNew(event: any) {
    this.add.emit(event.value);
  }

  fileName = 'Listado-Preguntas.xlsx';

  getExport(): void {
    let element = document.getElementById('exportExcel');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    XLSX.writeFile(wb, this.fileName);
  }

  onEdit(id: any) {
    this.edit.emit(id);
  }

  onDelete(question: Question) {
    if (confirm("Desea eliminar la Pregunta: " + question.description + " ?")) {
      this.checklistSvc.deleteQuestion(question.id).then(r => console.log(r));
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
