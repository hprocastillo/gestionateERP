import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {Category} from "../../../interfaces/checklist";
import {ChecklistService} from "../../../services/checklist.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-category-by-id',
  templateUrl: './category-by-id.component.html',
  styleUrls: ['./category-by-id.component.scss']
})
export class CategoryByIdComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() categoryId: string | any;

  //Results
  category = {} as Category;

  constructor(private checklistSvc: ChecklistService) {
  }

  ngOnInit(): void {
    if (this.categoryId) {
      this.checklistSvc.getCategoryById(this.categoryId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.category = res;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
