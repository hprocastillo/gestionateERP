import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {AuthService} from "../../../auth/services/auth.service";
import {ActivatedRoute, Params} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {Company} from "../../../dashboard/interfaces/company";
import {CompanyService} from "../../../dashboard/services/company.service";

@Component({
  selector: 'app-reports-logistics',
  templateUrl: './reports-logistics.component.html',
  styleUrls: ['./reports-logistics.component.scss']
})
export class ReportsLogisticsComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  //INITIAL TAB
  active = 1;

  //PAGES
  pageIndicatorsByVehicle: boolean = true;

  //Results
  userId: string | any;
  listCompanies: Company[] = [];


  constructor(
    public authSvc: AuthService,
    private activatedRoute: ActivatedRoute,
    private companySvc: CompanyService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.userId = params.id;

        if (this.userId) {
          this.companySvc.getCompanyByUserId(this.userId).pipe(
            takeUntil(this.unsubscribe$)
          ).subscribe(
            (res: Company[]) => {
              this.listCompanies = res;
            }
          );
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
