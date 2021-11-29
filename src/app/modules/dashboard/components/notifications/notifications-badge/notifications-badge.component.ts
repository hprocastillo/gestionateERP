import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {Company} from "../../../interfaces/company";
import {Request} from "../../../interfaces/request";
import {CompanyService} from "../../../services/company.service";
import {RequestsService} from "../../../services/requests.service";
import {takeUntil} from "rxjs/operators";
import firebase from "firebase";
import User = firebase.User;

@Component({
  selector: 'app-notifications-badge',
  templateUrl: './notifications-badge.component.html',
  styleUrls: ['./notifications-badge.component.scss']
})
export class NotificationsBadgeComponent implements OnInit, OnDestroy {
  //Unsubscribe method
  private unsubscribe$ = new Subject<void>();

  //Inputs and Outputs
  @Input() user = {} as User;

  //Results
  listRequests: Request[] = [];

  constructor(
    private companySvc: CompanyService,
    private requestSvc: RequestsService) {
  }

  ngOnInit(): void {
    if (this.user) {
      this.companySvc.getCompanyByUserId(this.user.uid).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Company[]) => {
          if (res.length > 0) {

            //If exist company then query requests collection
            if (res[0].id) {
              this.requestSvc.getRequestsByJoin(res[0].id).pipe(
                takeUntil(this.unsubscribe$)
              ).subscribe(
                (res: Request[]) => {
                  this.listRequests = res;
                }
              );
            }
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
