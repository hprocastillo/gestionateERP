import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import firebase from "firebase";
import {takeUntil} from "rxjs/operators";

//Services
import {ChecklistService} from "../../../services/checklist.service";

//Interfaces
import {Category} from "../../../interfaces/checklist";
import User = firebase.User;

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})

export class EditCategoryComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() editCategory: string | any;
  @Input() user = {} as User;
  @Output() cancel = new EventEmitter<boolean>();

  //Results
  category = {} as Category;

  //Variables
  today = new Date();

  constructor(private checklistSvc: ChecklistService) {
  }

  ngOnInit(): void {
    if (this.editCategory) {
      this.checklistSvc.getCategoryById(this.editCategory).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.category = res;
        }
      );
    }
  }

  getEdit(user: User, editCategory: string) {
    this.category.name = this.category.name.toUpperCase();
    this.category.updatedBy = user.uid;
    // @ts-ignore
    this.category.updatedAt = this.today;
    this.checklistSvc.updateCategory(this.category, editCategory).then();
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
