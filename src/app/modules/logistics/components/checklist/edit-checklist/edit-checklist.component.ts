import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import firebase from "firebase";
import {takeUntil} from "rxjs/operators";

//Services
import {ChecklistService} from "../../../services/checklist.service";

//Interfaces
import {Checklist} from "../../../interfaces/checklist";
import User = firebase.User;

@Component({
  selector: 'app-edit-checklist',
  templateUrl: './edit-checklist.component.html',
  styleUrls: ['./edit-checklist.component.scss']
})

export class EditChecklistComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() editChecklist: string | any;
  @Input() user = {} as User;
  @Output() cancel = new EventEmitter<boolean>();

  //Results
  checklist = {} as Checklist;

  //Variables
  today = new Date();

  constructor(private checklistSvc: ChecklistService) {
  }

  ngOnInit(): void {
    if (this.editChecklist) {
      this.checklistSvc.getChecklistById(this.editChecklist).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.checklist = res;
        }
      );
    }
  }

  getEdit(user: User, editChecklist: string) {
    this.checklist.description = this.checklist.description.toUpperCase();
    this.checklist.updatedBy = user.uid;
    // @ts-ignore
    this.checklist.updatedAt = this.today;
    this.checklistSvc.updateChecklist(this.checklist, editChecklist).then();
    this.cancel.emit(false);
  }

  getCancel() {
    this.cancel.emit(false);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
