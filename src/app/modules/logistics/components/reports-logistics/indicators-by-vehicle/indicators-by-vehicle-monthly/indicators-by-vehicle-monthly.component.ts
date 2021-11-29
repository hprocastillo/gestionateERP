import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {Company} from "../../../../../dashboard/interfaces/company";
import {Trip} from "../../../../interfaces/route";
import {RouteService} from "../../../../services/route.service";
import {takeUntil} from "rxjs/operators";
import firebase from "firebase";
import User = firebase.User;

@Component({
  selector: 'app-indicators-by-vehicle-monthly',
  templateUrl: './indicators-by-vehicle-monthly.component.html',
  styleUrls: ['./indicators-by-vehicle-monthly.component.scss']
})
export class IndicatorsByVehicleMonthlyComponent implements OnInit,OnDestroy {

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
              return item.startDate.toDate().getMonth() === this.today.getMonth()
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
