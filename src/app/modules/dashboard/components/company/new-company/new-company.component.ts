import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import firebase from "firebase";
import {Subject} from "rxjs";
import {CompanyService} from "../../../services/company.service";
import {CompanyType} from "../../../interfaces/company";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import User = firebase.User;

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.scss']
})
export class NewCompanyComponent implements OnInit, OnDestroy {
  //Unsubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() user = {} as User;

  //Results
  listCompaniesTypes: CompanyType[] = [];

  //New Form
  newForm: FormGroup;

  //Variables
  today = new Date();

  constructor(
    private fb: FormBuilder,
    private companySvc: CompanyService) {
    this.newForm = this.fb.group({
      companyTypeId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: [''],
      ruc: [''],
      webUrl: [''],
      phone: [''],
      address: ['']
    })
  }

  ngOnInit(): void {
    if (this.user) {
      this.companySvc.getCompaniesTypes().pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: CompanyType[]) => {
          this.listCompaniesTypes = res;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSave(user: User) {
    if (this.newForm.valid) {
      const company = this.newForm.value;
      const companyId = company?.id || null;
      company.createdBy = user.uid;
      company.createdAt = this.today;
      this.companySvc.saveCompany(company, companyId).then(r => console.log(r)).catch(err => console.log(err));
      this.newForm.reset();
    }
  }

}
