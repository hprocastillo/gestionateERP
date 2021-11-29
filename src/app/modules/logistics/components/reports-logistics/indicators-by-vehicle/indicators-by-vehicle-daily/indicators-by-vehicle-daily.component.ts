import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import firebase from "firebase";
import {Company} from "../../../../../dashboard/interfaces/company";
import {RouteService} from "../../../../services/route.service";
import {Trip} from "../../../../interfaces/route";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import User = firebase.User;

@Component({
  selector: 'app-indicators-by-vehicle-daily',
  templateUrl: './indicators-by-vehicle-daily.component.html',
  styleUrls: ['./indicators-by-vehicle-daily.component.scss']
})
export class IndicatorsByVehicleDailyComponent implements OnInit, OnDestroy {
  //unSubscribe method
  private unsubscribe$ = new Subject<void>();

  @Input() user = {} as User;
  @Input() company = {} as Company;

  //variable
  today = new Date();
  totalMileage: number | any;
  totalTimeOnRoute: number | any;

  //Results
  listTrips: Trip[] = [];

  constructor(private routeSvc: RouteService) {
  }

  ngOnInit(): void {
    if (this.company.id) {
      this.routeSvc.getTrips(this.company.id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Trip[]) => {
          let counter = 0;
          let totalMileage=0;
          let totalTimeOnRoute=0;

          if (counter === 0) {
            this.listTrips = res;

            this.listTrips = this.listTrips.filter(item => {
              return item.startDate.toDate().getDate() === this.today.getDate()
                && item.startDate.toDate().getMonth() === this.today.getMonth()
                && item.startDate.toDate().getFullYear() === this.today.getFullYear();
            });

            for (let i = 0; i < this.listTrips.length; i++) {
              totalMileage = totalMileage + this.listTrips[i].traveledMileage;
              totalTimeOnRoute = totalTimeOnRoute + this.listTrips[i].timeOnRoute;
            }
            this.totalMileage = totalMileage;
            this.totalTimeOnRoute = totalTimeOnRoute;
            counter++;
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
