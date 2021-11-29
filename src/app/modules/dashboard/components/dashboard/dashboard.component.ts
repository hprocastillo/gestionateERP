import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import firebase from "firebase";
import {Company} from "../../interfaces/company";
import {CompanyService} from "../../services/company.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import User = firebase.User;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  //Unsubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() user = {} as User

  //Results
  exist: boolean | undefined;
  listCompanies: Company[] = [];



  constructor(private companySvc: CompanyService) {
  }

  ngOnInit(): void {
    if (this.user) {
      this.companySvc.getCompanyByUserId(this.user.uid).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Company[]) => {
          if (res.length > 0) {
            this.exist = true;
            this.listCompanies = res;
          } else {
            this.exist = false;
          }
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
