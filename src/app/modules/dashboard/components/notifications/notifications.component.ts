import {Component, OnDestroy, OnInit} from '@angular/core';
import {Company} from "../../interfaces/company";
import {CompanyService} from "../../services/company.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {AuthService} from "../../../auth/services/auth.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  //Unsubscribe method
  private unsubscribe$ = new Subject<void>();

  //INITIAL TAB
  active = 1;

  //Variables
  userId: string | any;

  //Results
  listCompanies: Company[] = [];

  //Pages
  pageCurrentNotifications: boolean = true;
  pageHistoricalNotifications: boolean = true;

  constructor(
    public authSvc: AuthService,
    private activatedRoute: ActivatedRoute,
    private companySvc: CompanyService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.userId = params.userId;

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

  //SHOW
  // showCurrentNotifications() {
  //   this.pageCurrentNotifications = true;
  //   this.pageHistoricalNotifications = false;
  // }
  //
  // showHistoricalNotifications() {
  //   this.pageCurrentNotifications = false;
  //   this.pageHistoricalNotifications = true;
  // }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
