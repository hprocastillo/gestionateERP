import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import firebase from "firebase";

//Services
import {ChecklistService} from "../../../services/checklist.service";

//Interfaces
import {Company} from "../../../../dashboard/interfaces/company";
import {Question} from "../../../interfaces/checklist";
import User = firebase.User;

@Component({
  selector: 'app-list-question-by-checklist',
  templateUrl: './list-question-by-checklist.component.html',
  styleUrls: ['./list-question-by-checklist.component.scss']
})

export class ListQuestionByChecklistComponent implements OnInit, OnChanges, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() checklistSelected: string | any;
  @Input() user = {} as User;
  @Input() company = {} as Company;
  @Output() add = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<any>();

  //Pagination
  page: number = 1;
  pageSize: number = 5;

  //Result
  listQuestion: Question[] = [];

  constructor(private checklistSvc: ChecklistService) {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.checklistSelected && this.company.id) {
      this.checklistSvc.getQuestionsByChecklist(this.company.id, this.checklistSelected).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Question[]) => {
          this.listQuestion = res;
        }
      );
    }
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
