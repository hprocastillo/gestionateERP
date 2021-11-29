import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {ChecklistService} from "../../../services/checklist.service";
import {Checklist} from "../../../interfaces/checklist";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-checklist-by-id',
  templateUrl: './checklist-by-id.component.html',
  styleUrls: ['./checklist-by-id.component.scss']
})
export class ChecklistByIdComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() checklistId: string | any;

  //Results
  checklist = {} as Checklist;

  constructor(private checklistSvc: ChecklistService) {
  }

  ngOnInit(): void {
    if (this.checklistId) {
      this.checklistSvc.getChecklistById(this.checklistId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.checklist = res;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
