import {Component, EventEmitter, Input, Output} from '@angular/core';
import firebase from "firebase";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

//Services
import {ChecklistService} from "../../../services/checklist.service";

//Interfaces
import {Company} from "../../../../dashboard/interfaces/company";
import User = firebase.User;

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent {
  //Inputs and Outputs
  @Input() user = {} as User;
  @Input() company = {} as Company;
  @Output() cancel = new EventEmitter<boolean>();

  //New Form
  newForm: FormGroup;

  //Variables
  today = new Date();

  constructor(
    private fb: FormBuilder,
    private checklistSvc: ChecklistService) {
    this.newForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  getSave(user: User, company: Company) {
    if (this.newForm.valid) {
      const category = this.newForm.value;
      const categoryId = category?.id || null;
      category.name = category.name.toUpperCase();
      category.companyId = company.id;
      category.createdBy = user.uid;
      category.createdAt = this.today;
      this.checklistSvc.saveCategory(category, categoryId).then();
      this.newForm.reset();
      this.cancel.emit(false);
    }
  }

  getCancel() {
    this.cancel.emit(false);
  }
}
