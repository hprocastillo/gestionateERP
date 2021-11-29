import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import firebase from "firebase";

//Service
import {VehicleService} from "../../../services/vehicle.service";

//Interfaces
import {Company} from "../../../../dashboard/interfaces/company";
import User = firebase.User;

@Component({
  selector: 'app-new-brand',
  templateUrl: './new-brand.component.html',
  styleUrls: ['./new-brand.component.scss']
})
export class NewBrandComponent {
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
    private vehicleSvc: VehicleService) {
    this.newForm = this.fb.group({
      brand: ['', [Validators.required]],
    });
  }

  getSave(user: User, company: Company) {
    if (this.newForm.valid) {
      const brand = this.newForm.value;
      const brandId = brand?.id || null;
      brand.brand = brand.brand.toUpperCase();
      brand.companyId = company.id;
      brand.createdBy = user.uid;
      brand.createdAt = this.today;
      this.vehicleSvc.saveBrand(brand, brandId).then();
      this.newForm.reset();
      this.cancel.emit(false);
    }
  }

  getCancel() {
    this.cancel.emit(false);
  }
}
