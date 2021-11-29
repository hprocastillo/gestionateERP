import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Company, CompanyType} from "../../interfaces/company";
import {Subject} from "rxjs";
import {CompanyService} from "../../services/company.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() company = {} as Company;

  //Variables
  defaultName: string = 'Tu Empresa';
  defaultLogo: string = '../../../../../assets/images/dashboard/store.png';
  defaultTypeBusiness:string = 'Type Business';
  companyName: string | undefined;
  companyLogo: string | undefined;

  //Results
  companyType = {} as CompanyType;

  constructor(private companySvc: CompanyService) {
  }

  ngOnInit(): void {
    if (this.company) {
      this.companyName = this.company.name;
      this.companyLogo = this.company.logoUrl;
    }

    if (this.company.companyTypeId) {
      this.companySvc.getCompanyTypeById(this.company.companyTypeId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.companyType = res;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
