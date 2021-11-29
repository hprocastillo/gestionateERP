import {Component, EventEmitter, Input, Output} from '@angular/core';
import firebase from "firebase";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

//Services
import {RouteService} from "../../../services/route.service";

//Interfaces
import {Company} from "../../../../dashboard/interfaces/company";
import User = firebase.User;

@Component({
  selector: 'app-new-city',
  templateUrl: './new-city.component.html',
  styleUrls: ['./new-city.component.scss']
})

export class NewCityComponent {
  //Inputs and Outputs
  @Input() user = {} as User;
  @Input() company = {} as Company;
  @Output() cancel = new EventEmitter<boolean>();

  //New Form
  newForm: FormGroup;

  //variables
  today = new Date();

  constructor(private fb: FormBuilder, private routeSvc: RouteService) {
    this.newForm = this.fb.group({
      name: ['', [Validators.required]],
      coordinatesUrl: ['', [Validators.required]],
    });
  }

  getSave(user: User, company: Company) {
    if (this.newForm.valid) {
      const city = this.newForm.value;
      const cityId = city?.id || null;
      city.name = city.name.toUpperCase();
      city.companyId = company.id;
      city.createdBy = user.uid;
      city.createdAt = this.today;
      this.routeSvc.saveCity(city, cityId).then();
      this.newForm.reset();
      this.cancel.emit(false);
    }
  }

  getCancel() {
    this.cancel.emit(false);
  }
}
