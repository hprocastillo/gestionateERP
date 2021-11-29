import {Component, EventEmitter, Input, Output} from '@angular/core';
import firebase from "firebase";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

//Services
import {ChecklistService} from "../../../services/checklist.service";

//Interfaces
import {Company} from "../../../../dashboard/interfaces/company";
import User = firebase.User;

@Component({
  selector: 'app-new-checklist',
  templateUrl: './new-checklist.component.html',
  styleUrls: ['./new-checklist.component.scss']
})
export class NewChecklistComponent {
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
      description: ['', [Validators.required]],
    });
  }

  getSave(user: User, company: Company) {
    if (this.newForm.valid) {
      const checklist = this.newForm.value;
      const checklistId = checklist?.id || null;
      checklist.description = checklist.description.toUpperCase();
      checklist.publish = false;
      checklist.active = true;
      checklist.companyId = company.id;
      checklist.createdBy = user.uid;
      checklist.createdAt = this.today;
      this.checklistSvc.saveChecklist(checklist, checklistId).then();
      this.newForm.reset();
      this.cancel.emit(false);
    }
  }

  getCancel() {
    this.cancel.emit(false);
  }
}
